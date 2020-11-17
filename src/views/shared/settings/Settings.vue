<template>
  <vs-tabs
    id="settings-tabs"
    :key="isSmallerScreen"
    :position="isSmallerScreen ? 'top' : 'left'"
    class="tabs-shadow-none"
  >
    <!-- Profile Tab -->
    <vs-tab
      icon-pack="feather"
      icon="icon-user"
      :label="!isSmallerScreen ? 'Profile' : ''"
    >
      <div class="tab-profile md:ml-4 md:mt-0 mt-4 ml-0">
        <settings-profile />
      </div>
    </vs-tab>

    <!-- Security Tab -->
    <vs-tab
      icon-pack="feather"
      icon="icon-lock"
      :label="!isSmallerScreen ? 'Security' : ''"
    >
      <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
        <settings-security />
      </div>
    </vs-tab>

    <!-- Account Tab -->
    <!-- <vs-tab
      icon-pack="feather"
      icon="icon-link"
      :label="!isSmallerScreen ? 'Account' : ''"
    >
      <div class="tab-social-links md:ml-4 md:mt-0 mt-4 ml-0">
        <settings-account />
      </div>
    </vs-tab> -->

    <!-- Billing Tab -->
    <!-- <vs-tab
      icon-pack="feather"
      icon="icon-credit-card"
      :label="!isSmallerScreen ? 'Billing' : ''"
    >
      <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
        <settings-Billing />
      </div>
    </vs-tab> -->

    <!-- Notifications Tab -->
    <vs-tab
      icon-pack="feather"
      icon="icon-bell"
      :label="!isSmallerScreen ? 'Notifications' : ''"
    >
      <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
        <settings-notifications />
      </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
const SettingsProfile = () =>
  import(/* webpackChunkName: "settings-profile" */ "./SettingsProfile.vue");
const SettingsSecurity = () =>
  import(/* webpackChunkName: "settings-security" */ "./SettingsSecurity.vue");
// const SettingsAccount = () =>
//   import(/* webpackChunkName: "settings-account" */ "./SettingsAccount.vue");
// const SettingsBilling = () =>
//   import(/* webpackChunkName: "settings-account" */ "./SettingsBilling.vue");
const SettingsNotifications = () =>
  import(
    /* webpackChunkName: "settings-notifications" */ "./SettingsNotifications.vue"
  );

export default {
  components: {
    SettingsProfile,
    SettingsSecurity,
    // SettingsAccount,
    // SettingsBilling,
    SettingsNotifications
  },
  data() {
    return {};
  },
  computed: {
    isSmallerScreen() {
      return this.$store.state.windowWidth < 768;
    }
  }
};
</script>

<style lang="scss" scoped>
#settings-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>
