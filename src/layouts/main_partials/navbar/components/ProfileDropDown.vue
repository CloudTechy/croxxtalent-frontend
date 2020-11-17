<template>
  <div
    class="the-navbar__user-meta flex items-center"
  >
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold pt-4  text-capitalize">{{ $store.state.auth.user.first_name }}</p>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <b-avatar
          :text="authUserNameInitials"
          :src="$store.state.auth.user.photo_url"
          variant="secondary"
          size="3rem"
          class="cursor-pointer shadow-md block"
        ></b-avatar>
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdow profile-drop">
        <ul class="auth-user-prfile-dropdown-menu" style="min-width: 9rem">
          <li>
          <vs-dropdown-item>
            <router-link :to="{ name: 'settings' }" class="flex cursor-pointer">
              <feather-icon icon="SettingsIcon" svg-classes="w-4 h-4" /> <span class="ml-2">Settings</span>
            </router-link>
            </vs-dropdown-item>
          </li>
          <vs-divider class="m-1" />
          <li>
          <vs-dropdown-item>
            <router-link :to="{ name: 'logout' }" class="flex cursor-pointer">
              <feather-icon icon="LogOutIcon" svg-classes="w-4 h-4" /> <span class="ml-2">Log Out</span>
            </router-link>
            </vs-dropdown-item>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authUserNameInitials: this.$store.state.auth.user.photo_url
        ? null
        : this.$store.state.auth.user.name_initials,
    };
  },
};
</script>
