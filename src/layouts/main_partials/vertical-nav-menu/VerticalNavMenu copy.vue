<!--  eslint-disable vue/name-property-casing -->
<!-- VerticalNavMenu.vue -->

<template>
  <div class="parentx">
    <vs-sidebar
      ref="verticalNavMenu"
      v-model="isVerticalNavMenuActive"
      v-hammer:swipe="onMenuSwipe"
      class="v-nav-menu items-no-padding"
      default-index="-1"
      :click-not-close="clickNotClose"
      :reduce-not-rebound="reduceNotRebound"
      :parent="parent"
      :hidden-background="clickNotClose"
      :reduce="reduce"
    >
      <div @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <!-- Header -->
        <div
          slot="header"
          class="header-sidebar flex items-end justify-between"
        >
          <!-- Logo -->
          <router-link
            tag="div"
            class="vx-logo cursor-pointer flex items-center"
            to="/"
          >
            <logo class="w-10 mr-4 fill-current text-primary" />
            <span
              v-show="isMouseEnter || !reduce"
              v-if="title"
              class="vx-logo-text text-primary"
              >{{ title }}</span
            >
          </router-link>
          <!-- /Logo -->

          <!-- Menu Buttons -->
          <div>
            <!-- Close Button -->
            <template v-if="showCloseButton">
              <feather-icon
                icon="XIcon"
                class="m-0 cursor-pointer"
                @click="
                  $store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)
                "
              />
            </template>

            <!-- Toggle Buttons -->
            <template v-else-if="!showCloseButton && !verticalNavMenuItemsMin">
              <feather-icon
                id="btnVNavMenuMinToggler"
                class="mr-0 cursor-pointer"
                :icon="reduce ? 'CircleIcon' : 'DiscIcon'"
                svg-classes="stroke-current text-primary"
                @click="toggleReduce(!reduce)"
              />
            </template>
          </div>
          <!-- /Menu Toggle Buttons -->
        </div>
        <!-- /Header -->

        <!-- Header Shadow -->
        <div v-show="showShadowBottom" class="shadow-bottom" />

        <!-- Menu Items -->
        <component
          :is="scrollbarTag"
          ref="verticalNavMenuPs"
          :key="$vs.rtl"
          class="scroll-area-v-nav-menu pt-2"
          :settings="settings"
          @ps-scroll-y="psSectionScroll"
          @scroll="psSectionScroll"
        >
          <nav-menu-talent v-if="$store.state.auth.user.type === 'talent'"></nav-menu-talent>
          <nav-menu-employer v-if="$store.state.auth.user.type === 'employer'"></nav-menu-employer>
          <nav-menu-affiliate v-if="$store.state.auth.user.type === 'affiliate'"></nav-menu-affiliate>
          <nav-menu-admin v-if="$store.state.auth.user.type === 'admin'"></nav-menu-admin>

          <!-- Group Header 
          <span class="navigation-header truncate">Dropdown</span>-->



          <!-- Log Out Menu 
          <div class="sub-menu">
            <ul class="ml-4">
              <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('logout') }]">  
                    <router-link :to="{ name: 'logout' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('logout') }]"> 
                    <feather-icon icon="ListIcon" class="list-icon" /> 
                    <span class="truncate mr-3 select-none">Dropdown</span>
                    <vs-chip class="ml-auto mr-4 bg-danger">New</vs-chip>
                    <feather-icon
                    :class     = "[{'rotate90' : openItems}, 'feather-grp-header-arrow']"
                    :icon       = "bottom ? 'ChevronDownIcon' : $vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                    svg-classes= "w-4 h-4" />    
                  </router-link>
                </div>
              <li>
                <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('logout') }]">
                  <router-link :to="{ name: 'logout' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('logout') }]">
                    <feather-icon icon="CircleIcon" class="list-icon" />          
                    <span class="truncate">Log Out</span>
                  </router-link>
                </div>
              </li>
              <li>
                <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('logout') }]">
                  <router-link :to="{ name: 'logout' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('logout') }]">
                    <feather-icon icon="CircleIcon" class="" />          
                    <span class="truncate">Log Out</span>
                  </router-link>
                </div>
              </li>
              <li>
                <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('logout') }]">
                  <router-link :to="{ name: 'logout' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('logout') }]">
                    <feather-icon icon="CircleIcon" class="" />          
                    <span class="truncate">Log Out</span>
                  </router-link>
                </div>
              </li>
              <li>
                <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('logout') }]">
                  <router-link :to="{ name: 'logout' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('logout') }]">
                    <feather-icon icon="CircleIcon" class="" />          
                    <span class="truncate">Log Out</span>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>-->

          <!-- Group Header -->
          <span class="navigation-header truncate">Others</span>
          


          <!-- Log Out Menu -->
          <div class="vs-sidebar--item" :class="[{ 'vs-sidebar-item-active': activeLink('logout') }]">
            <router-link :to="{ name: 'logout' }" tabindex="-1" exact :class="[{ 'router-link-active': activeLink('logout') }]">
              <feather-icon icon="LogOutIcon" class="" />          
              <span class="truncate">Log Out</span>
            </router-link>
          </div>

      
        </component>
        <!-- /Menu Items -->
      </div>
    </vs-sidebar>

    <!-- Swipe Gesture -->
    <div
      v-if="!isVerticalNavMenuActive"
      v-hammer:swipe="onSwipeAreaSwipe"
      class="v-nav-menu-swipe-area"
    />
    <!-- /Swipe Gesture -->
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import VNavMenuGroup from './VerticalNavMenuGroup.vue'
import VNavMenuItem from "./VerticalNavMenuItem.vue";

const NavMenuTalent = () =>
  import(/* webpackChunkName: "nav-menu-talent" */ "./NavMenuTalent.vue");
const NavMenuEmployer = () =>
  import(/* webpackChunkName: "nav-menu-employer" */ "./NavMenuEmployer.vue");
const NavMenuAffiliate = () =>
  import(/* webpackChunkName: "nav-menu-affiliate" */ "./NavMenuAffiliate.vue");
const NavMenuAdmin = () =>
  import(/* webpackChunkName: "nav-menu-admin" */ "./NavMenuAdmin.vue");

import Logo from "../Logo.vue";

export default {
  // eslint-disable-next-line vue/name-property-casing
  name: "v-nav-menu",
  components: {
    VNavMenuGroup,
    VNavMenuItem,
    VuePerfectScrollbar,
    Logo,
    NavMenuTalent,
    NavMenuEmployer,
    NavMenuAffiliate,
    NavMenuAdmin
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    logo: { type: String },
    openGroupHover: { type: Boolean, default: false },
    // eslint-disable-next-line vue/require-default-prop
    parent: { type: String },
    reduceNotRebound: { type: Boolean, default: true },
    navMenuItems: { type: Array, required: true },
    // eslint-disable-next-line vue/require-default-prop
    title: { type: String }
  },
  data: () => ({
    clickNotClose: false, // disable close navMenu on outside click
    isMouseEnter: false,
    reduce: false, // determines if navMenu is reduce - component property
    showCloseButton: false, // show close button in smaller devices
    settings: {
      // perfectScrollbar settings
      maxScrollbarLength: 60,
      wheelSpeed: 1,
      swipeEasing: true
    },
    showShadowBottom: false
  }),
  computed: {
    isGroupActive() {
      return item => {
        const path = this.$route.fullPath;
        const routeParent = this.$route.meta
          ? this.$route.meta.parent
          : undefined;
        let open = false;

        const func = item => {
          if (item.submenu) {
            item.submenu.forEach(item => {
              if (
                item.url &&
                (path === item.url || routeParent === item.slug)
              ) {
                open = true;
              } else if (item.submenu) {
                func(item);
              }
            });
          }
        };
        func(item);
        return open;
      };
    },
    menuItemsUpdated() {
      const clone = this.navMenuItems.slice();

      for (const [index, item] of this.navMenuItems.entries()) {
        if (item.header && item.items.length && (index || 1)) {
          const i = clone.findIndex(ix => ix.header === item.header);
          for (const [subIndex, subItem] of item.items.entries()) {
            clone.splice(i + 1 + subIndex, 0, subItem);
          }
        }
      }

      return clone;
    },
    isVerticalNavMenuActive: {
      get() {
        return this.$store.state.isVerticalNavMenuActive;
      },
      set(val) {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", val);
      }
    },
    layoutType() {
      return this.$store.state.mainLayoutType;
    },
    reduceButton: {
      get() {
        return this.$store.state.reduceButton;
      },
      set(val) {
        this.$store.commit("TOGGLE_REDUCE_BUTTON", val);
      }
    },
    isVerticalNavMenuReduced() {
      return Boolean(this.reduce && this.reduceButton);
    },
    verticalNavMenuItemsMin() {
      return this.$store.state.verticalNavMenuItemsMin;
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  watch: {
    $route() {
      if (this.isVerticalNavMenuActive && this.showCloseButton)
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);
    },
    reduce(val) {
      const verticalNavMenuWidth = val
        ? "reduced"
        : this.$store.state.windowWidth < 1200
        ? "no-nav-menu"
        : "default";
      this.$store.dispatch("updateVerticalNavMenuWidth", verticalNavMenuWidth);

      setTimeout(function() {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    },
    layoutType() {
      this.setVerticalNavMenuWidth();
    },
    reduceButton() {
      this.setVerticalNavMenuWidth();
    },
    windowWidth() {
      this.setVerticalNavMenuWidth();
    }
  },
  mounted() {
    this.setVerticalNavMenuWidth();
  },
  methods: {
    onMenuSwipe(event) {
      if (event.direction === 4 && this.$vs.rtl) {
        // Swipe Right
        if (this.isVerticalNavMenuActive && this.showCloseButton)
          this.isVerticalNavMenuActive = false;
      } else if (event.direction === 2 && !this.$vs.rtl) {
        // Swipe Left
        if (this.isVerticalNavMenuActive && this.showCloseButton)
          this.isVerticalNavMenuActive = false;
      }
    },
    onSwipeAreaSwipe(event) {
      if (event.direction === 4 && !this.$vs.rtl) {
        // Swipe Right
        if (!this.isVerticalNavMenuActive && this.showCloseButton)
          this.isVerticalNavMenuActive = true;
      } else if (event.direction === 2 && this.$vs.rtl) {
        // Swipe Left
        if (!this.isVerticalNavMenuActive && this.showCloseButton)
          this.isVerticalNavMenuActive = true;
      }
    },
    psSectionScroll() {
      const scroll_el =
        this.$refs.verticalNavMenuPs.$el || this.$refs.verticalNavMenuPs;
      this.showShadowBottom = scroll_el.scrollTop > 0;
    },
    mouseEnter() {
      if (this.reduce)
        this.$store.commit("UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN", false);
      this.isMouseEnter = true;
    },
    mouseLeave() {
      if (this.reduce)
        this.$store.commit("UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN", true);
      this.isMouseEnter = false;
    },
    setVerticalNavMenuWidth() {
      if (this.windowWidth > 1200) {
        if (this.layoutType === "vertical") {
          // Set reduce
          this.reduce = !!this.reduceButton;

          // Open NavMenu
          this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);

          // Set Menu Items Only Icon Mode
          const verticalNavMenuItemsMin = !!(
            this.reduceButton && !this.isMouseEnter
          );
          this.$store.commit(
            "UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN",
            verticalNavMenuItemsMin
          );

          // Menu Action buttons
          this.clickNotClose = true;
          this.showCloseButton = false;

          const verticalNavMenuWidth = this.isVerticalNavMenuReduced
            ? "reduced"
            : "default";
          this.$store.dispatch(
            "updateVerticalNavMenuWidth",
            verticalNavMenuWidth
          );

          return;
        }
      }

      // Close NavMenu
      this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);

      // Reduce button
      if (this.reduceButton) this.reduce = false;

      // Menu Action buttons
      this.showCloseButton = true;
      this.clickNotClose = false;

      // Update NavMenu Width
      this.$store.dispatch("updateVerticalNavMenuWidth", "no-nav-menu");

      // Remove Only Icon in Menu
      this.$store.commit("UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN", false);

      // if(this.layoutType === 'vertical' || (this.layoutType === 'horizontal' && this.windowWidth < 1200))
      // if (this.windowWidth < 1200) {

      //   // Close NavMenu
      //   this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)

      //   // Reduce button
      //   if (this.reduceButton) this.reduce = false

      //   // Menu Action buttons
      //   this.showCloseButton = true
      //   this.clickNotClose   = false

      //   // Update NavMenu Width
      //   this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu')

      //   // Remove Only Icon in Menu
      //   this.$store.commit('UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN', false)

      // } else {

      //   // Set reduce
      //   this.reduce = this.reduceButton ? true : false

      //   // Open NavMenu
      //   this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)

      //   // Set Menu Items Only Icon Mode
      //   const verticalNavMenuItemsMin = (this.reduceButton && !this.isMouseEnter) ? true : false
      //   this.$store.commit('UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN', verticalNavMenuItemsMin)

      //   // Menu Action buttons
      //   this.clickNotClose   = true
      //   this.showCloseButton = false

      //   const verticalNavMenuWidth   = this.isVerticalNavMenuReduced ? "reduced" : "default"
      //   this.$store.dispatch('updateVerticalNavMenuWidth', verticalNavMenuWidth)
      // }
    },
    toggleReduce(val) {
      this.reduceButton = val;
      this.setVerticalNavMenuWidth();
    },

    activeLink(routeName) {
      return !!(
        (routeName && 
          (this.$route.path === routeName ||
          this.$route.meta.parent === routeName))
      );
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/croxx/components/verticalNavMenu.scss";
</style>
