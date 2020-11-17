<!-- =========================================================================================
  File Name: VerticalNavMenuGroup.vue
  Description: Vertical NavMenu Group Component. Extends vuesax framework's 'vs-sidebar-group' component
  Component Name: VerticalNavMenuGroup
  ----------------------------------------------------------------------------------------
  Item Name: croxx - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Retenvo
  Author URL: http://www.retenvo.com/user/Retenvo
========================================================================================== -->


<template>
  <div
    class  = "vs-sidebar-group"
    :class = "[
      {'vs-sidebar-group-open'            : openItems        },
      {'vs-sidebar-group-active'          : open             },
      {'disabled-item pointer-events-none': group.isDisabled }
    ]"
    @mouseover = "mouseover"
    @mouseout  = "mouseout">

      <!-- Group Label -->
      <div @click="clickGroup" class="group-header w-full">
        <span class="flex items-center w-full">

          <!-- Group Name -->
          <feather-icon icon= 'ListIcon'/> 
          <span v-show="!verticalNavMenuItemsMin" class="truncate mr-3 select-none">Hello</span>

          <!-- Group Tag -->
          <vs-chip class="ml-auto mr-4 bg-success">3</vs-chip>
        </span>

        <!-- Group Collapse Icon -->
        <feather-icon
          v-show     = "!verticalNavMenuItemsMin"
          :class     = "[{'rotate90' : openItems}, 'feather-grp-header-arrow']"
          :icon       = "$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
          svg-classes= "w-4 h-4" />
      </div>
      <!-- /Group Label -->

      <!-- Group Items -->
      <ul ref="items" :style="styleItems" class="vs-sidebar-group-items">
        <li>

          <!-- If item is group -->

          <v-nav-menu-item
            icon-small>
            <feather-icon icon  = 'CircleIcon'
            svgClasses = 'w-3 h-3' />       
              <span class="truncate">Log Out</span>
              <!-- <vs-chip class="ml-auto" :color="groupItem.tagColor" v-if="groupItem.tag">{{ groupItem.tag }}</vs-chip> -->
          </v-nav-menu-item>

        </li>
        <li>

          <!-- If item is group -->

          <v-nav-menu-item
            icon-small>
            <feather-icon icon  = 'CircleIcon'
            svgClasses = 'w-3 h-3' />       
              <span class="truncate">Log In</span>
              <!-- <vs-chip class="ml-auto" :color="groupItem.tagColor" v-if="groupItem.tag">{{ groupItem.tag }}</vs-chip> -->
          </v-nav-menu-item>

        </li>
        <li>

          <!-- If item is group -->

          <v-nav-menu-item
            icon-small>
            <feather-icon icon  = 'CircleIcon'
            svgClasses = 'w-3 h-3' />       
              <span class="truncate">Nowkhgigkkugouyk</span>
              <!-- <vs-chip class="ml-auto" :color="groupItem.tagColor" v-if="groupItem.tag">{{ groupItem.tag }}</vs-chip> -->
          </v-nav-menu-item>

        </li>
      </ul>
      <!-- /Group Items -->
  </div>
</template>


<script>
import VNavMenuItem from './VerticalNavMenuItem.vue'

export default {
  name  : 'v-nav-menu-group',
  props : {
    openHover  : { type: Boolean, default: false },
    open       : { type: Boolean, default: false },
    group      : { type: Object },
    groupIndex : { type: Number }
  },
  components: {
    VNavMenuItem
  },
  data: () => ({
    maxHeight : '0px',
    openItems : false
  }),
  computed: {
    verticalNavMenuItemsMin () { return this.$store.state.verticalNavMenuItemsMin },
    styleItems () {
      return { maxHeight: this.maxHeight }
    },
    itemIcon () {
      return (index) => {
        if (!((index.match(/\./g) || []).length > 1)) return 'CircleIcon'
      }
    },
    isGroupActive () {
      return (item) => {
        const path        = this.$route.fullPath
        let open          = false
        const routeParent = this.$route.meta ? this.$route.meta.parent : undefined

        const func = (item) => {
          if (item.submenu) {
            item.submenu.forEach((item) => {
              if ((path === item.url || routeParent === item.slug) && item.url) { open = true } else if (item.submenu) { func(item) }
            })
          }
        }

        func(item)
        return open
      }
    }
  },
  watch: {
    // OPEN & CLOSES DROPDOWN ON ROUTE CHANGE
    '$route' () {
      if (this.verticalNavMenuItemsMin) return

      const scrollHeight = this.scrollHeight

      // Collapse Group
      if (this.openItems && !this.open) {

        this.maxHeight = `${scrollHeight}px`
        setTimeout(()  => {
          this.maxHeight = `${0}px`
        }, 50)

      // Expand Group
      } else if (this.open) {

        this.maxHeight = `${scrollHeight}px`
        setTimeout(()  => {
          this.maxHeight = 'none'
        }, 300)
      }
    },
    maxHeight () {
      this.openItems = this.maxHeight !== '0px'
    },
    // OPEN AND CLOSES DROPDOWN MENU ON NavMenu COLLAPSE AND DEFAULT VIEW
    '$store.state.verticalNavMenuItemsMin' (val) {
      const scrollHeight = this.$refs.items.scrollHeight

      if (!val && this.open) {

        this.maxHeight = `${scrollHeight}px`
        setTimeout(()  => {
          this.maxHeight = 'none'
        }, 300)
      } else {

        this.maxHeight = `${scrollHeight}px`
        setTimeout(()  => {
          this.maxHeight = '0px'
        }, 50)
      }
      if (val && this.open) {

        this.maxHeight = `${scrollHeight}px`
        setTimeout(()  => {
          this.maxHeight = '0px'
        }, 250)
      }
    }
  },
  methods: {
    clickGroup () {
      if (!this.openHover) {

        const thisScrollHeight = this.$refs.items.scrollHeight

        if (this.maxHeight === '0px') {
          this.maxHeight = `${thisScrollHeight}px`
          setTimeout(() => {
            this.maxHeight = 'none'
          }, 300)

        } else {
          this.maxHeight = `${thisScrollHeight}px`
          setTimeout(() => {
            this.maxHeight = `${0}px`
          }, 50)
        }

        this.$parent.$children.map((child) => {
          if (child.isGroupActive) {
            if (child !== this && !child.open && child.maxHeight !== '0px') {
              setTimeout(() => {
                child.maxHeight = `${0}px`
              }, 50)
            }
          }
        })
      }
    },
    mouseover () {
      if (this.openHover) {
        const scrollHeight = this.$refs.items.scrollHeight
        this.maxHeight   = `${scrollHeight}px`
      }
    },
    mouseout () {
      if (this.openHover) {
        const scrollHeight = 0
        this.maxHeight   = `${scrollHeight}px`
      }
    }
  },
  mounted () {
    this.openItems = this.open
    if (this.open) { this.maxHeight = 'none' }
  }
}

</script>


<style lang="scss">
@import "@/assets/scss/croxx/components/verticalNavMenuGroup.scss"
</style>
