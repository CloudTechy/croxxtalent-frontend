<template>
  <div>
    <b-alert
      v-if="!$store.state.auth.user.email_verified_at"
      variant="warning"
      show
    >
      <b-icon icon="exclamation-circle" variant="warning" class="mr-2"></b-icon>
      Your account is not verified.
      <a href="#" class="hover:underline" @click="resendVerificationEmail">
        Resend Verification Email
      </a>
    </b-alert>
  </div>
</template>
<script>
export default {
  methods: {
    resendVerificationEmail() {
      let vm = this;
      this.$swal
        .fire({
          type: "warning",
          title: `Resend Verification Email?`,
          text: "Click Yes to proceed.",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success mx-2",
            cancelButton: "btn btn-secondary mx-2"
          },
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.$store
              .dispatch(
                "users/resendVerification",
                this.$store.state.auth.user.id
              )
              .then(() => {
                if (
                  this.$store.state.users.success !== false &&
                  this.$store.state.users.error === false
                ) {
                  return { response: "success" };
                } else {
                  return { response: "error" };
                }
              });
          }
        })
        .then(result => {
          if (result.value) {
            if (result.value.response == "success") {
              let msg = this.$store.state.users.success;
              this.$store.commit("users/REMOVE_ERROR_SUCCESS");
              this.$swal.fire("", msg, "success").then(function() {
                // successful, re-fetch auth user data
                vm.$store.dispatch("auth/user");
              });
            } else {
              let msg = this.$store.state.users.error;
              this.$store.commit("users/REMOVE_ERROR_SUCCESS");
              this.$swal.fire("", msg, "error");
            }
          }
        }); // this.$swal.fire({...}).then({...})
    }
  }
};
</script>
