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
      <span v-if="$store.state.auth.user.type !== 'admin'" class="navigation-header truncate" v-show="!verticalNavMenuItemsMin">Management</span>

      <!-- Start Dropdown Menu Item -->
      <div v-if="$store.state.auth.user.type !== 'admin'" class="mt-2">            
        <vs-collapse accordion>
          <vs-collapse-item>
            <div slot="header">
              <div @click="clickGroup" class="vs-sidebar-group">
                <div class="group-header w-full">
                  <span class="flex items-center w-full">
                    <!-- Group Name -->
                    <feather-icon icon= 'UsersIcon'/> 
                    <span class="truncate mr-3 select-none">Users</span>
                    <!-- Group Tag -->
                    <vs-chip class="ml-auto mr-4 bg-success" v-show="!verticalNavMenuItemsMin">3</vs-chip>
                  </span>
                </div>
              </div>
            </div>
            <!-- Group Menu Items -->
            <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('logout') }]">
              <router-link :to="{ name: 'logout' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('logout') }]">
                <feather-icon icon  = 'CircleIcon' svgClasses = 'w-3 h-3' />          
                <span class="truncate">View List</span>
              </router-link>
            </div>
          </vs-collapse-item>
        </vs-collapse>
      </div>
      <!-- End Dropdown Menu Item -->



      <!-- sub menu  -->
      <span class="navigation-header truncate" v-show="!verticalNavMenuItemsMin">Accounts</span>
      <!-- Menu  -->
      <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('admin-users-talents') }]">
        <router-link :to="{ name: 'admin-users-talents' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('admin-users-talents') }]">
          <feather-icon icon="UsersIcon" class="" />          
          <span class="truncate">Talents</span>
        </router-link>
      </div>
      <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('admin-users-employers') }]">
        <router-link :to="{ name: 'admin-users-employers' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('admin-users-employers') }]">
          <feather-icon icon="UsersIcon" class="" />          
          <span class="truncate">Employers</span>
        </router-link>
      </div>
      <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('admin-users-admins') }]">
        <router-link :to="{ name: 'admin-users-admins' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('admin-users-admins') }]">
          <feather-icon icon="UsersIcon" class="" />          
          <span class="truncate">Admins</span>
        </router-link>
      </div>
      
      <!-- Nav Group Header -->
      <span class="navigation-header truncate" v-show="!verticalNavMenuItemsMin">Campaign</span>
      <!-- Campaign Menu  -->
      <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('admin-campaigns') }]">
        <router-link :to="{ name: 'admin-campaigns' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('admin-campaigns') }]">
          <feather-icon icon="AwardIcon" class="" />          
          <span class="truncate">Campaigns</span>
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
      return (
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