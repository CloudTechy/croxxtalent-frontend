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

      <!-- Nav Group Header -->
      <span class="navigation-header truncate mx-4">Manage Cv</span>

    
      <!-- CV Builder Menu -->
      <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('cvBuilder') }]">
        <router-link :to="{ name: 'cvBuilder' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('cvBuilder') }]">
          <feather-icon icon="LayersIcon" class="" />          
          <span class="truncate">CV Builder</span>
        </router-link>
      </div>
      <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('my-jobs') }]">
        <router-link :to="{ name: 'my-jobs' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('my-jobs') }]">
          <feather-icon icon="BriefcaseIcon" class="" />          
          <span class="truncate">My Jobs</span>
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