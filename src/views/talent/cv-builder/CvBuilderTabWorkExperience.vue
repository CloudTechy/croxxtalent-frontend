<template>
  <div>
    <cv-builder-content-work-experience
      ref="cvBuilderContentWorkExperience"
    ></cv-builder-content-work-experience>
  </div>
</template>
<script>
const CvBuilderContentWorkExperience = () =>
  import(
    /* webpackChunkName: "cv-builder-content-work-experience" */ "./CvBuilderContentWorkExperience.vue"
  );
export default {
  components: {
    CvBuilderContentWorkExperience
  }
};
</script>
