<template>
  <div class="mx-4">
    <!-- Dashboard Menu -->
      <div
        class="vs-sidebar--item"
        :class="[
          { 'vs-sidebar-item-active': activeLink('dashboard') },
          { 'disabled-item pointer-events-none': isDisabled }
        ]"
      >
        <router-link :to="{ name: 'dashboard' }" tabindex="-1" class="router-link-exact-active" :class="[{ 'router-link-active': activeLink('dashboard') }]">
          <feather-icon icon="HomeIcon" class="" />
          <span class="truncate">Dashboard</span>
        </router-link>
      </div>

      <!-- /Refferal Items -->
          <!-- Nav Group Header -->
          <span class="navigation-header truncate" v-show="!verticalNavMenuItemsMin">Refferals</span>
          <!-- Refferal Menu  -->
          <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('refferal') }]">
            <router-link :to="{ name: 'affiliate-referrals' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('affiliates/referrals') }]">
              <feather-icon icon="LinkIcon" class="" />          
              <span class="truncate">Referrals</span>
            </router-link>
          </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDisabled: false
    }
  },
  
  methods: {
    activeLink(routeName) {
      return !!(
        (routeName && 
          (this.$route.path === routeName ||
          this.$route.meta.parent === routeName))
      );
    },

    verticalNavMenuItemsMin() {
      return this.$store.state.verticalNavMenuItemsMin;
    }
  },
}
</script>