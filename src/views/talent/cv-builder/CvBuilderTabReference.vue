<template>
  <div>
    <cv-builder-content-reference
      ref="cvBuilderContentReference"
    ></cv-builder-content-reference>
  </div>
</template>
<script>
const CvBuilderContentReference = () =>
  import(
    /* webpackChunkName: "cv-builder-content-work-experience" */ "./CvBuilderContentReference.vue"
  );
export default {
  components: {
    CvBuilderContentReference
  }
};
</script>
