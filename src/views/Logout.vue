<template>
  <div></div>
</template>
<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // access to component instance via `vm`
      let loader = vm.$loading.show({}); // vue-loading-overlay option
      vm.$store.dispatch("auth/logout").then(() => {
        if (vm.loading === false) {
          vm.$router.replace({ name: "login" });
          loader.hide(); // vue-loading-overlay instance method
        }
      });
    });
  }
};
</script>
