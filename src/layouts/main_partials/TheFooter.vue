<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: croxx - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Croxx Talent
========================================================================================== -->

<template functional>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
    <p>
      <span>Copyright &copy; </span>
      <span>{{ new Date().getFullYear() }} </span>
      <a href="#" target="_blank">Croxx Talent</a>
      <span class="hidden sm:inline-block">, All rights Reserved</span>
    </p>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    classes: {
      type: String
    }
  }
};
</script>
