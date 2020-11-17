<template>
  <div>
    <div no-shadow class="vx-row mb-5">
      <vx-card title="Current Plan" subtitle="Croxx Talent Free Plan: 0.00 USD">
        <p>
          Upgrade to Premium Plan for access to search, view talent, download
          CVs, and invite talents.
        </p>
        <!-- Button -->
        <!-- <div class="flex flex-wrap items-center  justify-end mt-base">
          <router-link
            :to="{ name: 'manage-subscription' }"
            tag="a"
            class="text-primary"
            >Back to Manage Subcription</router-link
          >
        </div>
        <div class="flex flex-wrap items-center  justify-end mt-base">
          <router-link
            :to="{ name: 'settings' }"
            tag="a"
            class="text-primary ml-2"
            >Go to billing settings</router-link
          >
        </div> -->
      </vx-card>
    </div>

    <div class="vx-row">
      <!-- Monthly plan -->
      <div
        class="vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 md:mb-base sm:mb-0 mb-base"
      >
        <vx-card
          no-shadow
          title="Premium Plan (Monthly)"
          subtitle="100 USD per month"
        >
          <div class="mb-base">
            <h6 class="mb-4">Croxx Talent Free Plan</h6>
            <div class="flex items-center mb-4">
              <feather-icon icon="CheckIcon" class="text-success" />
              <span class="ml-4">Employer dashboard.</span>
            </div>
            <div class="flex items-center mb-4">
              <feather-icon icon="CheckIcon" class="text-success" />
              <span class="ml-4">Create campaigns.</span>
            </div>
            <div class="flex items-center mb-4">
              <feather-icon icon="CheckIcon" class="text-success" />
              <span class="ml-4">Search for talent.</span>
            </div>
            <div class="flex items-center mb-4">
              <feather-icon icon="CheckIcon" class="text-success" />
              <span class="ml-4">View talent's CV.</span>
            </div>
            <div class="flex items-center mb-4">
              <feather-icon icon="CheckIcon" class="text-success" />
              <span class="ml-4">Download talent's CV.</span>
            </div>
            <div class="flex items-center mb-4">
              <feather-icon icon="CheckIcon" class="text-success" />
              <span class="ml-4">Invite talents.</span>
            </div>
          </div>
          <!-- Subscribe Button -->
          <div class="flex flex-wrap items-center justify-end mt-base">
            <vs-button color="primary" @click="payNow">Subscribe</vs-button>
          </div>
        </vx-card>
      </div>
      <!-- Yearly plan -->
      <div
        class="vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 md:mb-base sm:mb-0 mb-base"
      >
        <vx-card
          no-shadow
          title="Premium Plan (Yearly)"
          subtitle="1,000 USD per year"
        >
          <div class="mb-base">
            <h6 class="mb-4">Croxx Talent Free Plan</h6>
            <div class="flex items-center mb-4">
              <feather-icon icon="CheckIcon" class="text-success" />
              <span class="ml-4">Employer dashboard.</span>
            </div>
            <div class="flex items-center mb-4">
              <feather-icon icon="CheckIcon" class="text-success" />
              <span class="ml-4">Create campaigns.</span>
            </div>
            <div class="flex items-center mb-4">
              <feather-icon icon="CheckIcon" class="text-success" />
              <span class="ml-4">Search for talent.</span>
            </div>
            <div class="flex items-center mb-4">
              <feather-icon icon="CheckIcon" class="text-success" />
              <span class="ml-4">View talent's CV.</span>
            </div>
            <div class="flex items-center mb-4">
              <feather-icon icon="CheckIcon" class="text-success" />
              <span class="ml-4">Download talent's CV.</span>
            </div>
            <div class="flex items-center mb-4">
              <feather-icon icon="CheckIcon" class="text-success" />
              <span class="ml-4">Invite talents.</span>
            </div>
          </div>
          <!-- Subscribe Button -->
          <div class="flex flex-wrap items-center justify-end mt-base">
            <vs-button color="primary" @click="payNow">Subscribe</vs-button>
          </div>
        </vx-card>
      </div>
    </div>

    <div class="vx-row"></div>
  </div>
</template>
<script>
export default {
  methods: {
    payNow() {
      this.$swal.fire(
        "Flutterwave Payment",
        "Please connect a verified merchant credentials.",
        "error"
      );
    }
  }
};
</script>
