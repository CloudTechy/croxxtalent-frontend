<template>
  <vx-card no-shadow>
    <b-row class="mb-10">
      <b-col cols="12">
        <h4>Profile Settings</h4>
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
      <b-col lg="6" order-lg="2">
        <!-- Img Row -->
        <b-avatar
          v-b-hover="showUploadAvatar"
          :text="authUserNameInitials"
          :src="$store.state.auth.user.photo_url"
          variant="secondary"
          size="8rem"
          class="avatar-upload mr-4 mb-4"
          badge-variant="dark"
        >
          <template v-if="!uploadProgress" v-slot:badge>
            <b-icon
              v-b-tooltip.hover
              icon="camera"
              scale="0.7"
              style="cursor: pointer;"
              title="Change Photo"
              @click="$refs.fileInputPhoto.click()"
            ></b-icon>
          </template>
        </b-avatar>
        <b-overlay
          :show="!!uploadProgress"
          no-wrap
          opacity="0.8"
          rounded="circle"
          class="ml-4"
          style="max-width: 8rem; max-height: 8rem;"
        >
          <template v-slot:overlay>
            <b-spinner variant="dark" label="Loading..."></b-spinner>
            <h6 v-if="uploadProgress">{{ uploadProgress }}%</h6>
          </template>
        </b-overlay>
        <br />
        <!-- PHOTO UPLOAD FROM FIELDS -->
        <validation-observer ref="uploadForm">
          <form>
            <validation-provider
              ref="fileInputPhotoProvider"
              v-slot="validationContext"
              vid="photo"
              name="Photo"
              rules="required|image|size:5120"
            >
              <input
                ref="fileInputPhoto"
                style="display: none;"
                accept="image/*"
                type="file"
                @change="selectPhotoFile"
              />
              <b-alert
                v-if="validationContext.errors[0] && !success && !isLoading"
                variant="danger"
                show
              >
                {{ validationContext.errors[0] }}
              </b-alert>
            </validation-provider>
          </form>
        </validation-observer>
      </b-col>

      <!-- PROFILE UPDATE FROM FIELDS -->
      <b-col lg="6" order-lg="1">
        <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
          <form @submit.prevent="handleSubmit(updateProfile)">
            <!-- First Name and Last Name field -->
            <b-row>
              <b-col md="6">
                <!-- First Name field -->
                <validation-provider
                  v-slot="validationContext"
                  vid="first_name"
                  name="First Name"
                  rules="required|max:30"
                >
                  <b-form-group
                    label="First Name"
                    label-for="input-first-name"
                    description=""
                    :invalid-feedback="validationContext.errors[0]"
                    valid-feedback=""
                    :state="$_getFormValidationState(validationContext)"
                  >
                    <b-form-input
                      id="input-first-name"
                      v-model.trim="form.first_name"
                      class="custom-input"
                      type="text"
                      placeholder="First Name"
                      maxlength="30"
                      autocomplete="off"
                      :state="$_getFormValidationState(validationContext)"
                      trim
                      size="lg"
                    ></b-form-input>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md="6">
                <!-- Last Name field -->
                <validation-provider
                  v-slot="validationContext"
                  vid="last_name"
                  name="Last Name"
                  rules="required|max:30"
                >
                  <b-form-group
                    label="Last Name"
                    label-for="input-last-name"
                    description=""
                    :invalid-feedback="validationContext.errors[0]"
                    valid-feedback=""
                    :state="$_getFormValidationState(validationContext)"
                  >
                    <b-form-input
                      id="input-last-name"
                      v-model.trim="form.last_name"
                      class="custom-input"
                      type="text"
                      placeholder="Last Name"
                      maxlength="30"
                      autocomplete="off"
                      :state="$_getFormValidationState(validationContext)"
                      trim
                      size="lg"
                    ></b-form-input>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>

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

            <resend-verification-email-notice></resend-verification-email-notice>

            <!-- Phone field -->
            <validation-provider
              v-slot="validationContext"
              vid="phone"
              name="Phone Number"
              rules="required|max:25"
            >
              <b-form-group
                label="Phone Number"
                label-for="input-phone"
                label-class="required"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <vue-tel-input
                  id="input-phone"
                  v-model.trim="form.phone"
                  class="form-control form-control-lg custom-phone-input"
                  :class="{ 'is-invalid': validationContext.errors[0] }"
                  autocomplete="off"
                ></vue-tel-input>
              </b-form-group>
            </validation-provider>

            <!-- Company Name field -->
            <validation-provider
              v-slot="validationContext"
              vid="company_name"
              name="Company Name"
              rules="max:100"
            >
              <b-form-group
                label="Company Name"
                label-for="input-company-name"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <b-form-input
                  id="input-company-name"
                  v-model.trim="form.company_name"
                  class="custom-input"
                  type="text"
                  placeholder="Company Name"
                  maxlength="100"
                  autocomplete="off"
                  :state="$_getFormValidationState(validationContext)"
                  trim
                  size="lg"
                ></b-form-input>
              </b-form-group>
            </validation-provider>

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

<style lang="scss" scoped>
//
</style>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import VueTelInput from "vue-tel-input";
Vue.use(VueTelInput, {
  dynamicPlaceholder: true,
  mode: "international"
});
import myMixins from "../../../mixins/myMixins.js";
import ResendVerificationEmailNotice from "../ResendVerificationEmailNotice";

export default {
  components: {
    ResendVerificationEmailNotice
  },

  mixins: [myMixins],

  data() {
    return {
      form: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        company_name: null
      },
      photoForm: {
        photo: null
      },
      authUserNameInitials: this.$store.state.auth.user.photo_url
        ? null
        : this.$store.state.auth.user.name_initials,
      avatarHovered: false
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
      dataSetTotal: state => state.dataSetTotal,
      uploadProgress: state => state.uploadProgress
    })
  },

  mounted() {
    this.$store.commit("users/REMOVE_ERROR_SUCCESS");
    // prefill the inputs
    this.form = {
      first_name: this.$store.state.auth.user.first_name,
      last_name: this.$store.state.auth.user.last_name,
      email: this.$store.state.auth.user.email,
      phone: this.$store.state.auth.user.phone,
      company_name: this.$store.state.auth.user.company_name
    };
  },

  methods: {
    resetFormData() {
      this.form = {
        first_name: this.$store.state.auth.user.first_name,
        last_name: this.$store.state.auth.user.last_name,
        email: this.$store.state.auth.user.email,
        phone: this.$store.state.auth.user.phone,
        company_name: this.$store.state.auth.user.company_name
      };
      this.$refs.form.reset();
    },

    updateProfile() {
      let loader = this.$loading.show({}); // vue-loading-overlay option
      this.$store
        .dispatch("users/update", {
          id: this.$store.state.auth.user.id,
          payload: this.form
        })
        .then(() => {
          if (this.success !== false && this.error === false) {
            // successful, re-fetch auth user data
            this.$store.dispatch("auth/user");
          } else {
            this.$refs.form.setErrors(this.validationErrors); // set VeeValidation error
          }
          loader.hide(); // vue-loading-overlay instance method
        });
    },

    showUploadAvatar(hovered) {
      this.avatarHovered = hovered;
    },

    async selectPhotoFile(e) {
      const { valid } = await this.$refs.fileInputPhotoProvider.validate(e);
      if (valid) {
        this.photoForm.photo = e.target.files[0];
        this.uploadPhoto();
      }
    },

    uploadPhoto() {
      let formData = new FormData();
      formData.append("photo", this.photoForm.photo);
      this.$store
        .dispatch("users/uploadPhoto", {
          id: this.$store.state.auth.user.id,
          payload: formData
        })
        .then(() => {
          if (this.success !== false && this.error === false) {
            // successful, re-fetch auth user data
            this.$store.dispatch("auth/user");
          } else {
            this.$refs.uploadForm.setErrors(this.validationErrors); // set VeeValidation error
          }
        });
    }
  },

  head: {
    title: function() {
      return {
        inner: "Profile Settings"
      };
    }
  }
};
</script>
