<template>
  <div>
    <cv-builder-content-profile
      ref="cvBuilderContentProfile"
    ></cv-builder-content-profile>
  </div>
</template>
<script>
const CvBuilderContentProfile = () =>
  import(
    /* webpackChunkName: "cv-builder-content-profile" */ "./CvBuilderContentProfile.vue"
  );
export default {
  components: {
    CvBuilderContentProfile
  }
};
</script>
