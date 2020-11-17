<template>
  <div class="h-screen flex w-full bg-img">
    <div
      class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center"
    >
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
              <img
                v-if="form.sendVerificationMode"
                src="@/assets/images/forgot-password.png"
                alt="login"
                class="mx-auto"
              />
              <img
                v-else
                src="@/assets/images/reset-password.png"
                alt="login"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg"
            >
              <div class="m-8 mb-4">
                <div v-if="form.sendVerificationMode">
                  <div class="vx-card__title mb-8">
                    <h4 class="mb-4">Recover your password</h4>
                    <p>
                      Please enter your email address and we'll send you
                      instructions on how to reset your password.
                    </p>
                  </div>
                </div>
                <div v-else>
                  <h4 class="mb-4">Set A New Password</h4>
                  <p>Please enter your new password.</p>
                </div>
              </div>

              <!-- Alert Box -->
              <div class="m-8 mb-4">
                <p v-if="$store.state.users.error">
                  <b-alert variant="danger" show>
                    {{ $store.state.users.error }}
                    <!-- eslint-disable-next-line -->
                    <ul v-for="(item, index) in $store.state.users.validationErrors" :key="index" class="ml-6" style="list-style-type:disc">
                      <li>{{ item[0] }}</li>
                    </ul>
                  </b-alert>
                </p>
                <p v-if="$store.state.users.success">
                  <!-- eslint-disable-next-line -->
                  <b-alert variant="success" show>{{ $store.state.users.success }}</b-alert>
                </p>
              </div>

              <!-- Form -->
              <div class="m-8 mt-4">
                <validation-observer
                  ref="form"
                  v-slot="{ invalid, handleSubmit }"
                >
                  <form
                    class="w-full"
                    @submit.prevent="
                      form.sendVerificationMode
                        ? handleSubmit(sendPasswordVerification)
                        : handleSubmit(resetNewPassword)
                    "
                  >
                    <div v-if="form.sendVerificationMode">
                      <!-- Email field -->
                      <validation-provider
                        v-slot="validationContext"
                        vid="email"
                        name="Email Address"
                        rules="required|email|max:150"
                      >
                        <b-form-group
                          label="Email Address"
                          label-for="input-email"
                          description=""
                          :invalid-feedback="validationContext.errors[0]"
                          valid-feedback=""
                          :state="$_getFormValidationState(validationContext)"
                        >
                          <b-form-input
                            id="input-email"
                            v-model.trim="form.email"
                            class="custom-input"
                            type="email"
                            placeholder="Email Address"
                            maxlength="150"
                            autocomplete="off"
                            :state="$_getFormValidationState(validationContext)"
                            trim
                            size="lg"
                          ></b-form-input>
                        </b-form-group>
                      </validation-provider>

                      <!-- Button -->
                      <div>
                        <b-button
                          type="submit"
                          variant="success"
                          size=""
                          class="btn-block p-3"
                        >
                          Send Password Reset Code
                        </b-button>
                      </div>
                    </div>
                    <div v-else>
                      <!-- New Password field -->
                      <validation-provider
                        v-slot="validationContext"
                        vid="new_password"
                        name="New Password"
                        rules="required|min:6"
                      >
                        <b-form-group
                          label="New Password"
                          label-for="input-new-pass"
                          description=""
                          :invalid-feedback="validationContext.errors[0]"
                          valid-feedback=""
                          :state="$_getFormValidationState(validationContext)"
                        >
                          <b-form-input
                            id="input-new-pass"
                            v-model.trim="form.new_password"
                            class="custom-input"
                            type="password"
                            placeholder="New Password"
                            :state="$_getFormValidationState(validationContext)"
                            trim
                            size="lg"
                          ></b-form-input>
                        </b-form-group>
                      </validation-provider>

                      <!-- Confirm New Password field -->
                      <validation-provider
                        v-slot="validationContext"
                        vid="new_password_confirmation"
                        name="Confirm New Password"
                        rules="required|confirmed:new_password"
                      >
                        <b-form-group
                          label="Confirm New Password"
                          label-for="input-new-pass-confirm"
                          description=""
                          :invalid-feedback="validationContext.errors[0]"
                          valid-feedback=""
                          :state="$_getFormValidationState(validationContext)"
                        >
                          <b-form-input
                            id="input-new-pass-confirm"
                            v-model.trim="form.new_password_confirmation"
                            class="custom-input"
                            type="password"
                            placeholder="Confirm New Password"
                            :state="$_getFormValidationState(validationContext)"
                            trim
                            size="lg"
                          ></b-form-input>
                        </b-form-group>
                      </validation-provider>

                      <!-- Password Reset Code field -->
                      <validation-provider
                        v-slot="validationContext"
                        vid="password_reset_code"
                        name="Password Reset Code"
                        rules="required|min:6"
                      >
                        <b-form-group
                          label="Password Reset Code"
                          label-for="input-password_reset_code"
                          description=""
                          :invalid-feedback="validationContext.errors[0]"
                          valid-feedback=""
                          :state="$_getFormValidationState(validationContext)"
                        >
                          <b-form-input
                            id="input-password_reset_code"
                            v-model.trim="form.password_reset_code"
                            class="custom-input"
                            type="text"
                            placeholder="Password Reset Code"
                            maxlength="100"
                            autocomplete="off"
                            :state="$_getFormValidationState(validationContext)"
                            trim
                            size="lg"
                          ></b-form-input>
                        </b-form-group>
                      </validation-provider>

                      <!-- Button -->
                      <div>
                        <b-button
                          type="submit"
                          variant="success"
                          size=""
                          class="btn-block p-3"
                        >
                          Set A New Password
                        </b-button>
                        <b-button
                          type="button"
                          variant="outline-secondary"
                          size=""
                          class="btn-block p-3 mt-2"
                          @click="sendPasswordVerification"
                        >
                          Resend Code
                        </b-button>
                      </div>
                    </div>
                  </form>
                </validation-observer>

                <!-- exit button -->
                <div class="text-center mt-4">
                  <router-link
                    :to="{ name: 'login' }"
                    tag="a"
                    class="btn button-link"
                  >
                    Return to Login
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import myMixins from "../mixins/myMixins.js";

export default {
  mixins: [myMixins],

  data() {
    return {
      form: {
        sendVerificationMode: true,
        email: null,
        new_password: null,
        new_password_confirmation: null
      }
    };
  },

  methods: {
    sendPasswordVerification() {
      let loader = this.$loading.show({}); // vue-loading-overlay option
      this.$store
        .dispatch("users/sendPasswordVerification", this.form)
        .then(() => {
          if (
            this.$store.state.users.success !== false &&
            this.$store.state.users.error === false
          ) {
            let successMsg = this.$store.state.users.success;
            this.$store.commit("users/REMOVE_ERROR_SUCCESS");
            this.$swal.fire({
              toast: true,
              type: "success",
              title: "",
              text: successMsg,
              showConfirmButton: false,
              position: "top-end", // bottom-start | top | top-end | center
              background: "#d4edda", // success:#d4edda | error:#f8d7da | warning:#f9edbe
              timer: 10000
            });
            // show set new password form fields
            this.form.sendVerificationMode = false;
          }
          loader.hide(); // vue-loading-overlay instance method
        });
    },

    resetNewPassword() {
      let loader = this.$loading.show({}); // vue-loading-overlay option
      this.$store.dispatch("users/resetNewPassword", this.form).then(() => {
        if (
          this.$store.state.users.success !== false &&
          this.$store.state.users.error === false
        ) {
          // successful
          // this.resetFormData();
          setTimeout(() => {
            this.$router.replace({ name: "login" });
          }, 3000);
        } else {
          this.$refs.form.setErrors(this.$store.state.users.validationErrors); // set VeeValidation error
        }
        loader.hide(); // vue-loading-overlay instance method
      });
    }
  },

  head: {
    title: function() {
      return {
        inner: "Reset Password"
      };
    }
  }
};
</script>
