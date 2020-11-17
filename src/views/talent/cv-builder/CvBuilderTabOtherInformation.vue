<template>
  <div>
    <cv-builder-content-skill
      ref="cvBuilderContentSkill"
    ></cv-builder-content-skill>
    <hr class="mt-20 mb-20" />
    <cv-builder-content-award
      ref="cvBuilderContentAward"
    ></cv-builder-content-award>
    <hr class="mt-20 mb-20" />
    <cv-builder-content-hobby
      ref="cvBuilderContentHobby"
    ></cv-builder-content-hobby>
    <hr class="mt-20 mb-20" />
    <cv-builder-content-language
      ref="cvBuilderContentLanguage"
    ></cv-builder-content-language>
  </div>
</template>
<script>
const CvBuilderContentSkill = () =>
  import(
    /* webpackChunkName: "cv-builder-content-education" */ "./CvBuilderContentSkill.vue"
  );
const CvBuilderContentAward = () =>
  import(
    /* webpackChunkName: "cv-builder-content-award" */ "./CvBuilderContentAward.vue"
  );
const CvBuilderContentHobby = () =>
  import(
    /* webpackChunkName: "cv-builder-content-hobby" */ "./CvBuilderContentHobby.vue"
  );
const CvBuilderContentLanguage = () =>
  import(
    /* webpackChunkName: "cv-builder-content-language" */ "./CvBuilderContentLanguage.vue"
  );
export default {
  components: {
    CvBuilderContentSkill,
    CvBuilderContentAward,
    CvBuilderContentHobby,
    CvBuilderContentLanguage
  }
};
</script>
