<!-- =========================================================================================
    File Name: VxTimeline.vue
    Description: Timeline Component
    Component Name: VxTimeline
    ----------------------------------------------------------------------------------------
    Item Name: croxx - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Croxx Talent
========================================================================================== -->

<template>
  <ul class="vx-timeline">
    <li v-for="item in data" :key="item.id">
      <div class="timeline-icon" :class="`bg-${item.color}`">
        <feather-icon
          :icon="item.icon"
          svg-classes="text-white stroke-current w-5 h-5"
        />
      </div>
      <div class="timeline-info">
        <p class="font-semibold">{{ item.title }}</p>
        <span class="activity-desc">{{ item.desc }}</span>
      </div>
      <small class="text-grey activity-e-time">{{ item.time }}</small>
    </li>
  </ul>
</template>

<script>
export default {
  // eslint-disable-next-line vue/name-property-casing
  name: "vx-timeline",
  props: {
    data: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/croxx/components/vxTimeline.scss";
</style>
