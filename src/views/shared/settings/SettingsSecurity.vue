<template>
  <vx-card no-shadow>
    <b-row class="mb-10">
      <b-col lg="6">
        <h4>Change Password</h4>
        <hr />
        <p v-if="error">
          <b-alert variant="danger" show>{{ error }}</b-alert>
        </p>
        <p v-if="success">
          <b-alert variant="success" show>{{ success }}</b-alert>
        </p>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="6">
        <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
          <form @submit.prevent="handleSubmit(changePassword)">
            <!-- Old Password field -->
            <validation-provider
              v-slot="validationContext"
              vid="password"
              name="Old Password"
              rules="required"
            >
              <b-form-group
                label="Old Password"
                label-for="input-pass"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <b-form-input
                  id="input-pass"
                  v-model.trim="form.password"
                  class="custom-input"
                  type="password"
                  placeholder="Old Password"
                  :state="$_getFormValidationState(validationContext)"
                  trim
                  size="lg"
                ></b-form-input>
              </b-form-group>
            </validation-provider>

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

            <!-- Force Log Out fields -->
            <b-form-group>
              <b-form-checkbox
                id="checkbox-force-logout"
                v-model="form.force_logout"
              >
                Log Out All Active Sessions
              </b-form-checkbox>
            </b-form-group>

            <!-- Buttons -->
            <div class="items-left justify-end">
              <vs-button class="ml-auto mt-2" button="submit">
                Save Changes
              </vs-button>
            </div>
          </form>
        </validation-observer>
      </b-col>
    </b-row>
  </vx-card>
</template>

<script>
import { mapState } from "vuex";
import myMixins from "../../../mixins/myMixins.js";

export default {
  mixins: [myMixins],

  data() {
    return {
      form: {
        password: null,
        new_password: null,
        new_password_confirmation: null,
        force_logout: false
      }
    };
  },

  computed: {
    ...mapState("users", {
      isLoading: state => state.loading,
      error: state => state.error,
      success: state => state.success,
      validationErrors: state => state.validationErrors,
      data: state => state.data,
      dataSet: state => state.dataSet,
      dataSetTotal: state => state.dataSetTotal
    })
  },

  mounted() {
    this.$store.commit("users/REMOVE_ERROR_SUCCESS");
  },

  methods: {
    resetFormData() {
      this.form = {
        password: null,
        new_password: null,
        new_password_confirmation: null,
        force_logout: false
      };
      this.$refs.form.reset();
    },

    changePassword() {
      let loader = this.$loading.show({}); // vue-loading-overlay option
      this.$store
        .dispatch("users/changePassword", {
          id: this.$store.state.auth.user.id,
          payload: this.form
        })
        .then(() => {
          if (this.success !== false && this.error === false) {
            // successful
            let force_logout = this.form.force_logout;
            this.resetFormData();
            // reload page if force logouut is enabled
            if (force_logout === true) {
              setTimeout(() => {
                location.reload();
                // this.$router.push({
                //   name: "login",
                //   params: { returnTo: "/settings" }
                // });
              }, 3000);
            }
          } else {
            this.$refs.form.setErrors(this.validationErrors); // set VeeValidation error
          }
          loader.hide(); // vue-loading-overlay instance method
        });
    }
  },

  head: {
    title: function() {
      return {
        inner: "Security Settings / Change Password"
      };
    }
  }
};
</script>
