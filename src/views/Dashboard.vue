<!--  eslint-disable vue/name-property-casing -->
<!-- VerticalNavMenu.vue -->

<template>
  <!-- Menu Items -->
  <div>
    <div v-if="$store.state.auth.user.type === 'admin'">
      <admin-dashboard />
    </div>
    <div v-if="$store.state.auth.user.type === 'employer'">
      <employer-dashboard />
    </div>
    <div v-if="$store.state.auth.user.type === 'affiliate'">
      <affiliate-dashboard />
    </div>
    <div v-if="$store.state.auth.user.type === 'talent'">
      <talent-dashboard />
    </div>
  </div>
</template>

<script>
const AdminDashboard = () =>
  import(/* webpackChunkName: "admin-dashboard" */ "./admin/AdminDashboard");
const EmployerDashboard = () =>
  import(
    /* webpackChunkName: "employer-dashboard" */ "./employer/EmployerDashboard"
  );
const AffiliateDashboard = () =>
  import(
    /* webpackChunkName: "affiliate-dashboard" */ "./affiliate/AffiliateDashboard"
  );
const TalentDashboard = () =>
  import(/* webpackChunkName: "talent-dashboard" */ "./talent/TalentDashboard");

export default {
  components: {
    AdminDashboard,
    EmployerDashboard,
    AffiliateDashboard,
    TalentDashboard
  }
};
</script>
