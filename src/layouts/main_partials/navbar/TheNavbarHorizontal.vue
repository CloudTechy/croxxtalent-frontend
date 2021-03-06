<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Croxx Talent
========================================================================================== -->

<template>
  <div class="relative">
    <div class="vx-navbar-wrapper navbar-full p-0">
      <vs-navbar
        class="navbar-custom navbar-skelton"
        :class="navbarClasses"
        :style="navbarStyle"
        :color="navbarColor"
      >

        <router-link
          tag="div"
          to="/"
          class="vx-logo cursor-pointer mx-auto flex items-center"
        >
          <logo class="w-10 mr-4 fill-current text-primary" />
          <span class="vx-logo-text text-primary">Croxx Talent</span>
        </router-link>

        <i18n />

        <search-bar />

        <notification-drop-down />

        <profile-drop-down />
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import I18n from './components/I18n.vue'
import SearchBar from "./components/SearchBar.vue";
import NotificationDropDown from "./components/NotificationDropDown.vue";
import ProfileDropDown from "./components/ProfileDropDown.vue";
import Logo from "../Logo.vue";

export default {
  name: "TheNavbarHorizontal",
  components: {
    Logo,
    I18n,
    SearchBar,
    NotificationDropDown,
    ProfileDropDown
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    logo: { type: String },
    navbarType: {
      type: String,
      required: true
    }
  },
  computed: {
    navbarColor() {
      let color = "#fff";
      if (this.navbarType === "sticky") color = "#f7f7f7";
      else if (this.navbarType === "static") {
        if (this.scrollY < 50) {
          color = "#f7f7f7";
        }
      }

      if (this.isThemedark === "dark") {
        if (color === "#fff") {
          color = "#10163a";
        } else {
          color = "#262c49";
        }
      }

      return color;
    },
    isThemedark() {
      return this.$store.state.theme;
    },
    navbarStyle() {
      return this.navbarType === "static"
        ? { transition: "all .25s ease-in-out" }
        : {};
    },
    navbarClasses() {
      return this.scrollY > 5 && this.navbarType === "static"
        ? null
        : "d-theme-dark-light-bg shadow-none";
    },
    scrollY() {
      return this.$store.state.scrollY;
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  }
};
</script>
