<!-- src/layouts/Main.vue -->
<template>
  <div
    class="layout--main"
    :class="[
      layoutTypeClass,
      navbarClasses,
      footerClasses,
      { 'no-scroll': isAppPage }
    ]"
  >

    <v-nav-menu
      :nav-menu-items="navMenuItems"
      title="Croxx Talent"
      parent=".layout--main"
    />

    <div
      id="content-area"
      :class="[contentAreaClass, { 'show-overlay': bodyOverlay }]"
    >
      <div id="content-overlay" />

      <!-- Navbar -->
      <template v-if="mainLayoutType === 'horizontal' && windowWidth >= 1200">
        <the-navbar-horizontal
          :navbar-type="navbarType"
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark }
          ]"
        />

        <div v-if="navbarType === 'static'" style="height: 62px"></div>

        <h-nav-menu
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark }
          ]"
          :nav-menu-items="navMenuItems"
        />
      </template>

      <template v-else>
        <the-navbar-vertical
          :navbar-color="navbarColor"
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark }
          ]"
        />
      </template>
      <!-- /Navbar -->

      <div class="content-wrapper">
        <div class="router-view">
          <div class="router-content">
            <transition :name="routerTransition">
              <div
                v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
                class="router-header flex flex-wrap items-center mb-6"
              >
                <div
                  class="content-area__heading"
                  :class="{
                    'pr-4 border-0 md:border-r border-solid border-grey-light':
                      $route.meta.breadcrumb
                  }"
                >
                  <h2 class="mb-1">{{ routeTitle }}</h2>
                </div>

                <!-- BREADCRUMB -->
                <vx-breadcrumb
                  v-if="$route.meta.breadcrumb"
                  class="ml-4 md:block hidden"
                  :route="$route"
                  :is-r-t-l="$vs.rtl"
                />
              </div>
            </transition>

            <div class="content-area__content">
              <back-to-top
                v-if="!hideScrollToTop"
                bottom="5%"
                :right="$vs.rtl ? 'calc(100% - 2.2rem - 38px)' : '30px'"
                visibleoffset="500"
              >
                <vs-button
                  icon-pack="feather"
                  icon="icon-arrow-up"
                  class="shadow-lg btn-back-to-top"
                />
              </back-to-top>

              <transition :name="routerTransition" mode="out-in">
                <router-view
                  @changeRouteTitle="changeRouteTitle"
                  @setAppClasses="
                    classesStr => $emit('setAppClasses', classesStr)
                  "
                />
              </transition>
            </div>
          </div>
        </div>
      </div>
      <the-footer />
    </div>
  </div>
</template>

<script>
import BackToTop from "vue-backtotop";
import HNavMenu from "@/layouts/main_partials/horizontal-nav-menu/HorizontalNavMenu.vue";
import TheNavbarHorizontal from "@/layouts/main_partials/navbar/TheNavbarHorizontal.vue";
import TheNavbarVertical from "@/layouts/main_partials/navbar/TheNavbarVertical.vue";
import TheFooter from "@/layouts/main_partials/TheFooter.vue";
import themeConfig from "@/../themeConfig.js";
import VNavMenu from "@/layouts/main_partials/vertical-nav-menu/VerticalNavMenu.vue";

// import navMenuItemsTalent from "./main_partials/vertical-nav-menu/navMenuItemsTalent.js";
// import navMenuItemsEmployer from "./main_partials/vertical-nav-menu/navMenuItemsEmployer.js";
// import navMenuItemsAffiliate from "./main_partials/vertical-nav-menu/navMenuItemsAffiliate.js";
// import navMenuItemsAdmin from "./main_partials/vertical-nav-menu/navMenuItemsAdmin.js";

// // let userType = this.$store.state.auth.user.type; 
// // let userType = "employer";

// // if (userType === "employer") {
// //   let navMenuItems = navMenuItemsEmployer;
// // } else if (userType === "affiliate") {
// //   let navMenuItems = navMenuItemsAffiliate;
// // } else if (userType === "admin") {
// //   let navMenuItems = navMenuItemsAdmin;
// // } else {
// //   let navMenuItems = navMenuItemsTalent;
// // }

import navMenuItems from "./main_partials/vertical-nav-menu/navMenuItems.js";

export default {
  components: {
    BackToTop,
    HNavMenu,
    TheFooter,
    TheNavbarHorizontal,
    TheNavbarVertical,
    VNavMenu,
  },
  data() {
    return {
      disableThemeTour: themeConfig.disableThemeTour,
      dynamicWatchers: {},
      footerType: themeConfig.footerType || "static",
      hideScrollToTop: themeConfig.hideScrollToTop,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || "#fff",
      navbarType: themeConfig.navbarType || "floating",
      navMenuItems,
      routerTransition: themeConfig.routerTransition || "none",
      routeTitle: this.$route.meta.pageTitle,
      steps: [
        {
          target: "#btnVNavMenuMinToggler",
          content: "Toggle Collapse Sidebar."
        },
        {
          target: ".i18n-locale",
          content: "You can change language from here."
        },
        {
          target: ".navbar-fuzzy-search",
          content: "Try fuzzy search to visit pages in flash."
        },
        {
          target: ".vs-button.buy-now",
          content: "Buy this awesomeness at affordable price!",
          params: {
            placement: "top"
          }
        }
      ]
    };
  },
  computed: {
    bodyOverlay() {
      return this.$store.state.bodyOverlay;
    },
    contentAreaClass() {
      if (this.mainLayoutType === "vertical") {
        if (this.verticalNavMenuWidth === "default")
          return "content-area-reduced";
        else if (this.verticalNavMenuWidth === "reduced")
          return "content-area-lg";
        else return "content-area-full";
      } else return "content-area-full";
    },
    footerClasses() {
      return {
        "footer-hidden": this.footerType === "hidden",
        "footer-sticky": this.footerType === "sticky",
        "footer-static": this.footerType === "static"
      };
    },
    isAppPage() {
      return this.$route.meta.no_scroll;
    },
    isThemeDark() {
      return this.$store.state.theme === "dark";
    },
    layoutTypeClass() {
      return `main-${this.mainLayoutType}`;
    },
    mainLayoutType() {
      return this.$store.state.mainLayoutType;
    },
    navbarClasses() {
      return {
        "navbar-hidden": this.navbarType === "hidden",
        "navbar-sticky": this.navbarType === "sticky",
        "navbar-static": this.navbarType === "static",
        "navbar-floating": this.navbarType === "floating"
      };
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  watch: {
    $route() {
      this.routeTitle = this.$route.meta.pageTitle;
    },
    isThemeDark(val) {
      const color = this.navbarColor === "#fff" && val ? "#10163a" : "#fff";
      this.updateNavbarColor(color);
    },
    "$store.state.mainLayoutType"(val) {
      this.setNavMenuVisibility(val);
      this.disableThemeTour = true;
    }
  },
  created() {
    const color =
      this.navbarColor === "#fff" && this.isThemeDark
        ? "#10163a"
        : this.navbarColor;
    this.updateNavbarColor(color);
    this.setNavMenuVisibility(this.$store.state.mainLayoutType);

    // Dynamic Watchers for tour
    // Reason: Once tour is disabled it is not required to enable it.
    // So, watcher is required for just disabling it.
    this.dynamicWatchers.windowWidth = this.$watch(
      "$store.state.windowWidth",
      val => {
        if (val < 1200) {
          this.disableThemeTour = true;
          this.dynamicWatchers.windowWidth();
        }
      }
    );

    this.dynamicWatchers.verticalNavMenuWidth = this.$watch(
      "$store.state.verticalNavMenuWidth",
      () => {
        this.disableThemeTour = true;
        this.dynamicWatchers.verticalNavMenuWidth();
      }
    );

    this.dynamicWatchers.rtl = this.$watch("$vs.rtl", () => {
      this.disableThemeTour = true;
      this.dynamicWatchers.rtl();
    });
  },
  beforeDestroy() {
    Object.keys(this.dynamicWatchers).map(i => {
      this.dynamicWatchers[i]();
      delete this.dynamicWatchers[i];
    });
  },
  methods: {
    changeRouteTitle(title) {
      this.routeTitle = title;
    },
    updateNavbar(val) {
      if (val === "static")
        this.updateNavbarColor(this.isThemeDark ? "#10163a" : "#fff");
      this.navbarType = val;
    },
    updateNavbarColor(val) {
      this.navbarColor = val;
      if (val === "#fff") this.isNavbarDark = false;
      else this.isNavbarDark = true;
    },
    updateFooter(val) {
      this.footerType = val;
    },
    updateRouterTransition(val) {
      this.routerTransition = val;
    },
    setNavMenuVisibility(layoutType) {
      if (
        (layoutType === "horizontal" && this.windowWidth >= 1200) ||
        (layoutType === "vertical" && this.windowWidth < 1200)
      ) {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);
        this.$store.dispatch("updateVerticalNavMenuWidth", "no-nav-menu");
      } else {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);
      }
    },
    toggleHideScrollToTop(val) {
      this.hideScrollToTop = val;
    }
  }
};
</script>
