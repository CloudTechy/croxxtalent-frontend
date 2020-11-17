<template>
  <div id="dashboard-analytics">
    <resend-verification-email-notice></resend-verification-email-notice>

    <div class="centerx">
      <vs-popup title="Online CV Builder" :active.sync="popupCvNotice">
        <p class="text-center">
          Create a Professional CV in minutes. Easiest step-by-step CV builder
          online!<br />
          No writing experience needed.
          <br />
          <br />
          <button class="btn btn-lg btn-outline-primary" @click="closeCvNotice">
            Create CV
          </button>
        </p>
      </vs-popup>
    </div>
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
            Welcome {{ $store.state.auth.user.first_name }},
          </h1>
          <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">
            Take the Guesswork Out of CVs. Create a CV in minutes.
          </p>
        </vx-card>
      </div>

      <!-- CARD 2: SUBSCRIBERS GAINED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          icon="BriefcaseIcon"
          :statistic="totalJobInvitations"
          statistic-title="Job Invitations"
          :chart-data="subscribersGained.series"
          type="area"
        ></statistics-card-line>
      </div>

      <!-- CARD 3: ORDER RECIEVED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          icon="CheckCircleIcon"
          :statistic="totalAcceptedJobInvitations"
          statistic-title="Accepted Offers"
          :chart-data="subscribersGained.series"
          color="success"
          type="area"
        ></statistics-card-line>
      </div>
    </div>

    <div class="vx-row">
      <!-- CARD4: SUPPORT TRACKER -->
      <div class="vx-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <vx-card title="CV BUILDER">
          <div class="text-center">
            <!-- eslint-disable -->
            <vue-ellipse-progress
              :data="vepData.circles"
              :progress="50"
              :angle="-90"
              color="blue"
              colorFill="transparent"
              emptyColor="#8ec5fc"
              emptyColorFill="transparent"           
              :size="300"
              :thickness="3"
              emptyThickness="10%"
              lineMode="in 10"
              :legend="true"
              :legendValue="60"
              legendClass="legend-custom-style"
              dash="60 0.9"
              animation="reverse 700 400"
              :noData="false"
              :loading="false"
              fontColor="white"
              :half="false"
              :gap="8"
              fontSize="5rem">
              <!-- <span slot="legend-value">/200</span> -->
              <p v-if="$store.state.auth.user.cv && $store.state.auth.user.cv.progress > 0 && $store.state.auth.user.cv.is_published === true" slot="legend-caption">
                <strong>CV Published</strong>
              </p>
              <p v-else-if="$store.state.auth.user.cv && $store.state.auth.user.cv.progress >= 100 && $store.state.auth.user.cv.is_published === false" slot="legend-caption">
                <strong>CV Unpublished</strong>
              </p>
              <p v-else-if="$store.state.auth.user.cv && $store.state.auth.user.cv.progress < 100" slot="legend-caption">
                <strong>{{ $store.state.auth.user.cv.progress }}%</strong>
                <br>
                CV Completion Progress
              </p>
              <p v-else slot="legend-caption">
                <strong>0%</strong><br>
                No CV Created Yet      
              </p>
            </vue-ellipse-progress>
            <!-- eslint-enable -->
            <br />
            <br />
            <div v-show="$store.state.auth.user.cv">
              <router-link
                v-if="$store.state.auth.user.cv.progress <= 0"
                :to="{ name: 'cvBuilder' }"
                tag="a"
                class="btn btn-lg btn-outline-primary"
              >
                Create CV
              </router-link>
              <router-link
                v-else-if="
                  $store.state.auth.user.cv.progress > 0 &&
                    $store.state.auth.user.cv.is_published === false
                "
                :to="{ name: 'cvBuilder' }"
                tag="a"
                class="btn btn-lg btn-outline-primary"
              >
                Finish CV Building Process
              </router-link>
              <div v-else>
                <router-link
                  :to="{ name: 'cvBuilder' }"
                  tag="a"
                  class="btn btn-lg btn-outline-primary mx-4 my-2"
                >
                  Update CV
                </router-link>
                <!-- <button
                  class="btn btn-lg btn-outline-secondary mx-4 my-2"
                  @click="unpublishCv"
                >
                  Unpublish Your CV
                </button> -->
              </div>
            </div>
            <div v-show="!$store.state.auth.user.cv">
              <router-link
                :to="{ name: 'cvBuilder' }"
                tag="a"
                class="btn btn-lg btn-outline-primary"
              >
                Create CV
              </router-link>
            </div>
          </div>
        </vx-card>
      </div>
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
      totalJobInvitations: "--",
      totalAcceptedJobInvitations: "--",
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
      ordersRecevied: {},
      salesBarSession: {},
      supportTracker: {},
      productsOrder: {},
      salesRadar: {},
      chartData: {},

      activityTimelineData: [],

      popupCvNotice: false,

      vepData: {
        circles: [
          {
            progress: 100,
            animation: "rs 1500 500",
            color: "#8ec5fc",
            thickness: 2
          },
          {
            progress: this.$store.state.auth.user.cv.progress,
            color: "#0040a1",
            thickness: 15
          },
          {
            progress: 100,
            animation: "rs 1500 500",
            color: "#8ec5fc",
            thickness: 2
          }
        ]
      }
    };
  },

  computed: {},

  created() {
    //
  },

  mounted() {
    this.popupCvNoticeCheck();
    this.renderActivityTimeline();
    this.loadJobInvitations();
    this.loadAcceptedJobInvitations();
  },

  methods: {
    popupCvNoticeCheck: function() {
      if (
        this.$store.state.auth.user.cv &&
        this.$store.state.auth.user.cv.progress > 0
      ) {
        this.popupCvNotice = false;
      } else {
        this.popupCvNotice = true;
      }
    },

    closeCvNotice: function() {
      this.popupCvNotice = false;
      this.$router.push({ name: "cvBuilder" });
    },

    unpublishCv: function() {
      let vm = this;
      this.$swal
        .fire({
          type: "warning",
          title: `Unpublish CV?`,
          text: "Click Yes to proceed.",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success mx-2",
            cancelButton: "btn btn-secondary mx-2"
          },
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.$store
              .dispatch("cvs/unpublish", this.$store.state.auth.user.cv.id)
              .then(() => {
                if (
                  this.$store.state.cvs.success !== false &&
                  this.$store.state.cvs.error === false
                ) {
                  return { response: "success" };
                } else {
                  return { response: "error" };
                }
              });
          }
        })
        .then(result => {
          if (result.value) {
            if (result.value.response == "success") {
              let msg = this.$store.state.cvs.success;
              this.$store.commit("cvs/REMOVE_ERROR_SUCCESS");
              this.$swal.fire("", msg, "success").then(function() {
                // successful, re-fetch auth user data
                vm.$store.dispatch("auth/user");
              });
            } else {
              let msg = this.$store.state.cvs.error;
              this.$store.commit("cvs/REMOVE_ERROR_SUCCESS");
              this.$swal.fire("", msg, "error");
            }
          }
        }); // this.$swal.fire({...}).then({...})
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
    }, // renderActivityTimeline()

    loadJobInvitations() {
      let payload = {
        per_page: "all"
      };
      this.$store
        .dispatch("users/jobInvitations", {
          id: this.$store.state.auth.user.id,
          payload: payload
        })
        .then(() => {
          if (this.$store.state.users.loadingJobInvitationsDataSet !== true) {
            this.totalJobInvitations = this.$store.state.users.jobInvitationsDataSetTotal;
          }
        });
    }, // loadJobInvitations()

    loadAcceptedJobInvitations() {
      let payload = {
        per_page: "all",
        status: "accepted"
      };
      this.$store
        .dispatch("users/jobInvitations", {
          id: this.$store.state.auth.user.id,
          payload: payload
        })
        .then(() => {
          if (this.$store.state.users.loadingJobInvitationsDataSet !== true) {
            this.totalAcceptedJobInvitations = this.$store.state.users.jobInvitationsDataSetTotal;
          }
        });
    } // loadAcceptedJobInvitations()
  }
};
</script>
