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
       <!-- /talents Items -->
          <!-- Nav Group Header -->
          <span class="navigation-header truncate" v-show="!verticalNavMenuItemsMin">Talents</span>
          <!-- Campaign Menu  -->
          <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('find_talents') }]">
            <router-link :to="{ name: 'find_talents' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('find_talents') }]">
              <feather-icon icon="SearchIcon" class="" />          
              <span class="truncate">Find Talent</span>
            </router-link>
          </div>
          <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('invited-talents') }]">
            <router-link :to="{ name: 'invited-talents' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('invited-talents') }]">
              <feather-icon icon="StarIcon" class="" />          
              <span class="truncate">Invited Talents</span>
            </router-link>
          </div>

       <!-- /Campaign Items -->
          <!-- Nav Group Header -->
          <span class="navigation-header truncate" v-show="!verticalNavMenuItemsMin">Campaign</span>
          <!-- Campaign Menu  -->
          <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('create-campaign') }]">
            <router-link :to="{ name: 'create-campaign' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('create-campaign') }]">
              <feather-icon icon="TargetIcon" class="" />          
              <span class="truncate">Create Campaign</span>
            </router-link>
          </div>
          <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('campaigns') }]">
            <router-link :to="{ name: 'campaigns' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('campaigns') }]">
              <feather-icon icon="AwardIcon" class="" />          
              <span class="truncate">Campaigns</span>
            </router-link>
          </div>
       <!-- Subscription Items -->
          <!-- Nav Group Header -->
          <span class="navigation-header truncate" v-show="!verticalNavMenuItemsMin">Subscription</span>
          <!-- Campaign Menu  -->
          <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('manage-subscription') }]">
            <router-link :to="{ name: 'manage-subscription' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('manage-subscription') }]">
              <feather-icon icon="CreditCardIcon" class="" />          
              <span class="truncate">Manage Subscription</span>
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