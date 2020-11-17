<template>
  <div>
    <cv-builder-content-education
      ref="cvBuilderContentEducation"
    ></cv-builder-content-education>
    <hr class="mt-20 mb-20" />
    <cv-builder-content-certification
      ref="cvBuilderContentCertification"
    ></cv-builder-content-certification>
  </div>
</template>
<script>
const CvBuilderContentEducation = () =>
  import(
    /* webpackChunkName: "cv-builder-content-education" */ "./CvBuilderContentEducation.vue"
  );
const CvBuilderContentCertification = () =>
  import(
    /* webpackChunkName: "cv-builder-content-certification" */ "./CvBuilderContentCertification.vue"
  );
export default {
  components: {
    CvBuilderContentEducation,
    CvBuilderContentCertification
  }
};
</script>
