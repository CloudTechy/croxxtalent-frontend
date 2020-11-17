<template>
  <vx-card no-shadow>
    <b-row class="mb-10">
      <b-col cols="12">
        <h4>Billing Information</h4>
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
            <!-- Address1 field -->
            <validation-provider
              v-slot="validationContext"
              vid="address_1"
              name="address-1"
              rules="max:100"
            >
              <b-form-group
                label="Address 1"
                label-for="input-address-1"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <b-form-input
                  id="input-address-1"
                  v-model.trim="form.address_1"
                  class="custom-input"
                  type="text"
                  placeholder="Address 1"
                  maxlength="100"
                  autocomplete="off"
                  :state="$_getFormValidationState(validationContext)"
                  trim
                  size="lg"
                ></b-form-input>
              </b-form-group>
            </validation-provider>

            <!-- Address2 field -->
            <validation-provider
              v-slot="validationContext"
              vid="address_2"
              name="address-2"
              rules="max:200"
            >
              <b-form-group
                label="Address 2"
                label-for="input-address-2"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <b-form-input
                  id="input-address-2"
                  v-model.trim="form.address_2"
                  class="custom-input"
                  type="text"
                  placeholder="Address 2"
                  maxlength="100"
                  autocomplete="off"
                  :state="$_getFormValidationState(validationContext)"
                  trim
                  size="lg"
                ></b-form-input>
              </b-form-group>
              <b-row>
                <b-col md="6">
                  <!-- Country field -->
                  <validation-provider
                    vid="country_code"
                    name="Country"
                    rules="required"
                  >
                    <b-form-group
                      label="Country"
                      label-for="input-country"
                      description=""
                      :invalid-feedback="validationContext.errors[0]"
                      valid-feedback=""
                      :state="$_getFormValidationState(validationContext)"
                    >
                      <v-select
                        id="input-country"
                        v-model.trim="form.country_code"
                        class="v-select"
                        placeholder="Country"
                        autocomplete="off"
                        :class="{ 'is-invalid': validationContext.errors[0] }"
                        :options="Object.values($store.state.countries.dataSet)"
                        label="name"
                        :reduce="option => option.code"
                        append-to-body
                        :calculate-position="withPopper"
                      >
                        <template v-slot:no-options>
                          <span v-if="$store.state.countries.loadingDataSet">
                            Loading data, please wait.
                          </span>
                          <span v-else>Sorry, no matching options.</span>
                        </template>
                        <template v-slot:option="option">
                          {{ option.name }}
                        </template>
                        <template v-slot:search="{ attributes, events }">
                          <input
                            id="country_code"
                            class="vs__search"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>
                      </v-select>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col md="6">
                  <!-- State field -->
                  <validation-provider
                    vid="state_id"
                    name="State"
                    rules="required"
                  >
                    <b-form-group
                      label="State"
                      label-for="input-state"
                      description=""
                      :invalid-feedback="validationContext.errors[0]"
                      valid-feedback=""
                      :state="$_getFormValidationState(validationContext)"
                    >
                      <v-select
                        id="input-state"
                        v-model.trim="form.state_id"
                        class="v-select"
                        placeholder="State"
                        autocomplete="off"
                        :class="{ 'is-invalid': validationContext.errors[0] }"
                        :options="Object.values($store.state.countries.statesDataSet)"
                        label="name"
                        :reduce="option => option.id"
                        append-to-body
                        :calculate-position="withPopper"
                      >
                        <template v-slot:no-options>
                          <span v-if="$store.state.countries.loadingStatesDataSet">
                            Loading data, please wait.
                          </span>
                          <span v-else>
                            Sorry, no matching options. You may need to select a
                            country to load the state data.
                          </span>
                        </template>
                        <template v-slot:option="option">
                          {{ option.name }}
                        </template>
                        <template v-slot:search="{ attributes, events }">
                          <input
                            id="state_id"
                            class="vs__search"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>
                      </v-select>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
              <!-- City and Postal Code field -->
              <b-row>
                <b-col md="6">
                  <!-- City field -->
                  <validation-provider
                    vid="city"
                    name="City"
                    rules="required|max:255"
                  >
                    <b-form-group
                      label="City"
                      label-for="input-city"
                      description=""
                      :invalid-feedback="validationContext.errors[0]"
                      valid-feedback=""
                      :state="$_getFormValidationState(validationContext)"
                    >
                      <b-form-input
                        id="input-city"
                        v-model.trim="form.city"
                        class="custom-input"
                        type="text"
                        placeholder="City"
                        maxlength="255"
                        autocomplete="off"
                        :state="$_getFormValidationState(validationContext)"
                        trim
                        size="lg"
                      ></b-form-input>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col md="6">
                  <!-- Postal Code field -->
                  <validation-provider
                    vid="postal_code"
                    name="Postal Code"
                    rules="max:10"
                  >
                    <b-form-group
                      label="Postal Code"
                      label-for="input-postal-code"
                      description=""
                      :invalid-feedback="validationContext.errors[0]"
                      valid-feedback=""
                      :state="$_getFormValidationState(validationContext)"
                    >
                      <b-form-input
                        id="input-postal-code"
                        v-model.trim="form.postal_code"
                        class="custom-input"
                        type="text"
                        placeholder="Postal Code"
                        maxlength="10"
                        autocomplete="off"
                        :state="$_getFormValidationState(validationContext)"
                        trim
                        size="lg"
                      ></b-form-input>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
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
import { mapState } from "vuex";
import myMixins from "../../../mixins/myMixins.js";

export default {
  mixins: [myMixins],

  data() {
    return {
      form: {
        first_name: this.$store.state.auth.user.first_name,
        last_name: this.$store.state.auth.user.last_name,
        email: this.$store.state.auth.user.email,
        company_name: this.$store.state.auth.user.company_name
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
  },

  methods: {
    resetFormData() {
      this.form = {
        first_name: this.$store.state.auth.user.first_name,
        last_name: this.$store.state.auth.user.last_name,
        email: this.$store.state.auth.user.email,
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
