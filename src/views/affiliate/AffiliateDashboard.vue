<template>
  <div id="dashboard-analytics">
    <resend-verification-email-notice></resend-verification-email-notice>

    <div class="vx-row">
      <!-- CARD 1: CONGRATS -->
      <div class="vx-col w-full lg:w-1/2 mb-base">
        <vx-card
          slot="no-body"
          class="text-center bg-primary-gradient greet-user"
        >
          <img
            src="@/assets/images/icons/decore-left.png"
            class="decore-left"
            alt="Decore Left"
            width="200"
          />
          <img
            src="@/assets/images/icons/decore-right.png"
            class="decore-right"
            alt="Decore Right"
            width="175"
          />
          <feather-icon
            icon="AwardIcon"
            class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow"
            svg-classes="h-8 w-8"
          ></feather-icon>
          <h1 class="mb-6 text-white text-capitalize">
            Hi {{ $store.state.auth.user.first_name }},
          </h1>
          <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">
            Earn up amazing rewards promoting Croxx Talent. You earn 10 Reward
            Points whenever a talent register through your link.
          </p>
        </vx-card>
      </div>

      <!-- CARD 2: SUBSCRIBERS GAINED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          icon="ActivityIcon"
          :statistic="$store.state.auth.user.total_affiliates"
          statistic-title="Referrals"
          :chart-data="subscribersGained.series"
          type="area"
        ></statistics-card-line>
      </div>

      <!-- CARD 3: ORDER RECIEVED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          icon="StarIcon"
          :statistic="$store.state.auth.user.affiliate_reward_points"
          statistic-title="Reward Points"
          :chart-data="subscribersGained.series"
          color="success"
          type="area"
        ></statistics-card-line>
      </div>
    </div>

    <div class="vx-row">
      <!-- CARD 5: Activity Timeline -->
      <div class="vx-col w-full lg:w-1/1 mb-base">
        <vx-card title="Affiliate/Referral Link">
          <b-input-group size="lg" class="mb-3" prepend="">
            <b-form-input v-model="referralLink" readonly></b-form-input>
            <b-input-group-append>
              <b-button
                v-clipboard:copy="referralLink"
                v-clipboard:success="onCopyReferralLink"
                v-clipboard:error="onErrorReferralLink"
                size="sm"
                text="Button"
                variant="light"
              >
                Copy Link
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </vx-card>
      </div>
    </div>

    <div class="vx-row">
      <!-- CARD 5: Activity Timeline -->
      <div class="vx-col w-full lg:w-1/2 mb-base">
        <vx-card title="Activity Timeline" style="min-height: 74vh;">
          <vx-timeline
            v-if="activityTimelineData.length > 0"
            :data="activityTimelineData"
          />
          <div v-else>No activity.</div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/*! rtl:begin:ignore */
#dashboard-analytics {
  .greet-user {
    position: relative;

    .decore-left {
      position: absolute;
      left: 0;
      top: 0;
    }
    .decore-right {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  @media (max-width: 576px) {
    .decore-left,
    .decore-right {
      width: 140px;
    }
  }
}
.swal2-container {
  z-index: 10000;
}
/*! rtl:end:ignore */
</style>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

import config from "../../config";
import StatisticsCardLine from "../../layouts/main_partials/statistics-cards/StatisticsCardLine.vue";
import VxTimeline from "../../layouts/main_partials/timeline/VxTimeline";
import ResendVerificationEmailNotice from "../shared/ResendVerificationEmailNotice";

export default {
  components: {
    StatisticsCardLine,
    VxTimeline,
    ResendVerificationEmailNotice
  },

  data() {
    return {
      checkpointReward: {},
      subscribersGained: {
        series: [
          {
            name: "Data",
            data: [28, 40, 36, 52, 38, 60, 55]
            // data: ["2020-08-01", "2020-08-02", "2020-08-03"]
          }
        ],
        analyticsData: {
          subscribers: 92600
        }
      },
      activityTimelineData: [],
      referralLink: null
    };
  },

  computed: {},

  created() {
    //
  },

  mounted() {
    this.renderActivityTimeline();

    // get referrak link
    let refLinkRoute = this.$router.resolve({
      name: "referral-link",
      params: { referralCode: this.$store.state.auth.user.referral_code }
    });
    this.referralLink = config.appUrl + refLinkRoute.href;
  },

  methods: {
    onCopyReferralLink: function() {
      this.$swal.fire({
        toast: true,
        type: "success",
        title: "",
        text: "Referral link copied.",
        showConfirmButton: false,
        position: "top-end", // bottom-start | top | top-end | center
        background: "#d4edda", // success:#d4edda | error:#f8d7da | warning:#f9edbe
        timer: 10000
      });
    },

    onErrorReferralLink: function() {
      this.$swal.fire({
        toast: true,
        type: "error",
        title: "",
        text: "Failed to copy referral link.",
        showConfirmButton: false,
        position: "top-end", // bottom-start | top | top-end | center
        background: "#f8d7da", // success:#d4edda | error:#f8d7da | warning:#f9edbe
        timer: 10000
      });
    },

    renderActivityTimeline: function() {
      if (
        this.$store.state.auth.user.recent_audits &&
        this.$store.state.auth.user.recent_audits.length > 0
      ) {
        let audits = this.$store.state.auth.user.recent_audits;
        let timelineData = [];
        for (let i = 0; i < audits.length; i++) {
          let icon = "LayoutIcon";
          let color = "primary";
          if (
            audits[i].event === "login" ||
            audits[i].event === "change_password" ||
            audits[i].event === "reset_password"
          ) {
            icon = "LockIcon";
            color = "warning";
          } else if (
            audits[i].event === "register" ||
            audits[i].event === "cvs.created"
          ) {
            icon = "UsersIcon";
            color = "success";
          } else if (
            audits[i].event === "cvs.updated" ||
            audits[i].event === "users.updated"
          ) {
            icon = "UsersIcon";
            color = "primary";
          } else if (audits[i].event === "users.photo.updated") {
            icon = "ImageIcon";
            color = "secondary";
          }
          timelineData.push({
            id: audits[i].id,
            color: color,
            icon: icon,
            title: audits[i].event_title,
            desc: audits[i].event_description,
            time: this.$moment(audits[i].created_at).fromNow()
          });
        }
        this.activityTimelineData = timelineData;
      }
    }
  }
};
</script>
