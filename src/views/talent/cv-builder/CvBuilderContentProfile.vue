<template>
  <div>
    <!-- <h2 class="card-title mb-2 mt-2">
      Enter your
      <span style="color: #00e574;">profile</span> and
      <span style="color: #00e574;">contact</span> information.
    </h2>
    <h6 class="mb-5">
      We suggest including a valid email and phone number.
    </h6> -->
    <h2 class="card-title mb-2 mt-2 text-center">
      Profile Information
    </h2>
    <h6 class="mb-5 text-center">
      Enter your <span style="color: #00e574;">profile</span> and
      <span style="color: #00e574;">contact</span> information.
    </h6>

    <b-row class="mb-2">
      <b-col cols="12">
        <p v-if="error">
          <b-alert variant="danger" show>{{ error }}</b-alert>
        </p>
        <p v-if="success">
          <b-alert variant="success" show>{{ success }}</b-alert>
        </p>
      </b-col>
    </b-row>

    <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
      <form class="w-full" @submit.prevent="handleSubmit(updateProfile)">
        <!-- Job Title and Photo field -->
        <b-row>
          <b-col md="6" order-md="2" class="mb-5 mb-md-auto text-left">
            <!-- Photo field -->
            <b-avatar
              v-b-hover="showUploadAvatar"
              square
              :text="nameInitials"
              :src="form.photo_url"
              variant="secondary"
              size="5.5rem"
              class="avatar-upload mr-4"
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
              class="ml-4 d-inline-block"
              style="max-width: 5.5rem; max-height: 5.5rem;"
            >
              <template v-slot:overlay>
                <b-spinner variant="dark" label="Loading..."></b-spinner>
                <h6 v-if="uploadProgress">{{ uploadProgress }}%</h6>
              </template>
            </b-overlay>
            <!-- PHOTO UPLOAD FROM FIELDS -->
            <input
              ref="fileInputPhoto"
              style="display: none;"
              accept="image/*"
              type="file"
              @change="selectPhotoFile"
            />
          </b-col>
          <b-col md="6" order-md="1">
            <!-- Job Title field -->
            <validation-provider
              v-slot="validationContext"
              vid="job_title_id"
              name="Job Title"
              rules="required"
            >
              <b-form-group
                label="Job Title"
                label-for="input-job_title_id"
                label-class="required"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <v-select
                  id="select-input-job_title_id"
                  v-model.trim="form.job_title_id"
                  class="v-select custom-input000"
                  placeholder="Job Title"
                  autocomplete="off"
                  :class="{ 'is-invalid': validationContext.errors[0] }"
                  :options="Object.values($store.state.jobTitles.dataSet)"
                  label="name"
                  :reduce="option => option.id"
                  append-to-body
                  :calculate-position="withPopper"
                >
                  <template v-slot:no-options>
                    <span v-if="$store.state.jobTitles.loadingDataSet">
                      Loading data, please wait.
                    </span>
                    <span v-else>Sorry, no matching options.</span>
                  </template>
                  <template v-slot:option="option">
                    {{ option.name }}
                  </template>
                  <template v-slot:search="{ attributes, events }">
                    <input
                      id="input-job_title_id"
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
                label-class="required"
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
                label-class="required"
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

        <!-- Gender and Data of Birth field -->
        <b-row>
          <b-col md="6">
            <!-- Gender field -->
            <validation-provider
              v-slot="validationContext"
              vid="gender"
              name="Gender"
              rules="required"
            >
              <b-form-group
                label="Gender"
                label-for="input-gender"
                label-class="required"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <v-select
                  id="select-input-gender"
                  v-model.trim="form.gender"
                  class="v-select custom-input000"
                  placeholder="Gender"
                  autocomplete="off"
                  :class="{ 'is-invalid': validationContext.errors[0] }"
                  :options="Object.values($_genderDataSet())"
                  label="name"
                  :reduce="option => option.id"
                  append-to-body
                  :calculate-position="withPopper"
                >
                  <template v-slot:no-options>
                    <span>Sorry, no matching options.</span>
                  </template>
                  <template v-slot:option="option">
                    {{ option.name }}
                  </template>
                  <template v-slot:search="{ attributes, events }">
                    <input
                      id="input-gender"
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
            <!-- Data of Birth field -->
            <validation-provider
              v-slot="validationContext"
              vid="date_of_birth"
              name="Date of Birth"
              rules="required"
            >
              <b-form-group
                label="Date of Birth"
                label-for="input-date-of-brith"
                label-class="required"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <datepicker
                  id="input-date-of-brith"
                  v-model.trim="form.date_of_birth"
                  placeholder="Select Date"
                  type="date"
                  input-class="custom-input p-4"
                  autocomplete="off"
                  :state="$_getFormValidationState(validationContext)"
                  typeable
                  bootstrap-styling
                  required
                ></datepicker>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>

        <!-- Email and Phone field -->
        <b-row>
          <b-col md="6">
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
                label-class="required"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <b-form-input
                  id="input-email"
                  v-model.trim="form.email"
                  class="custom-input"
                  type="text"
                  placeholder="Email Address"
                  maxlength="150"
                  autocomplete="off"
                  :state="$_getFormValidationState(validationContext)"
                  trim
                  size="lg"
                ></b-form-input>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="6">
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
          </b-col>
        </b-row>

        <!-- Address field -->
        <validation-provider
          v-slot="validationContext"
          vid="address"
          name="Address"
          rules="required|max:255"
        >
          <b-form-group
            label="Address"
            label-for="input-address"
            label-class="required"
            description=""
            :invalid-feedback="validationContext.errors[0]"
            valid-feedback=""
            :state="$_getFormValidationState(validationContext)"
          >
            <b-form-input
              id="input-address"
              v-model.trim="form.address"
              class="custom-input"
              type="text"
              placeholder="Address"
              maxlength="255"
              autocomplete="off"
              :state="$_getFormValidationState(validationContext)"
              trim
              size="lg"
            ></b-form-input>
          </b-form-group>
        </validation-provider>

        <!-- City and Postal Code field -->
        <b-row>
          <b-col md="6">
            <!-- City field -->
            <validation-provider
              v-slot="validationContext"
              vid="city"
              name="City"
              rules="required|max:255"
            >
              <b-form-group
                label="City"
                label-for="input-city"
                label-class="required"
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
              v-slot="validationContext"
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

        <!-- Country and State field -->
        <b-row>
          <b-col md="6">
            <!-- Country field -->
            <validation-provider
              v-slot="validationContext"
              vid="country_code"
              name="Country"
              rules="required"
            >
              <b-form-group
                label="Country"
                label-for="input-country"
                label-class="required"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <v-select
                  id="input-country"
                  v-model.trim="form.country_code"
                  class="v-select custom-input000"
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
              v-slot="validationContext"
              vid="state_id"
              name="State"
              rules="required"
            >
              <b-form-group
                label="State"
                label-for="input-state"
                label-class="required"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <v-select
                  id="input-state"
                  v-model.trim="form.state_id"
                  class="v-select custom-input000"
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

        <!-- Career Summary field -->
        <validation-provider
          v-slot="validationContext"
          vid="career_summary"
          name="Career Summary"
          rules="required|max:500"
        >
          <b-form-group
            label="Career Summary"
            label-for="input-career-summary"
            label-class="required"
            description=""
            :invalid-feedback="validationContext.errors[0]"
            valid-feedback=""
            :state="$_getFormValidationState(validationContext)"
          >
            <b-form-textarea
              id="input-career-summary"
              v-model.trim="form.career_summary"
              class="custom-input"
              placeholder="Career Summary"
              maxlength="500"
              rows="3"
              :state="$_getFormValidationState(validationContext)"
              trim
              size="lg"
            ></b-form-textarea>
          </b-form-group>
        </validation-provider>
      </form>
    </validation-observer>
  </div>
</template>

<style lang="scss" scoped>
//
</style>
<script>
import { mapState } from "vuex";
import myMixins from "../../../mixins/myMixins.js";

import Vue from "vue";
import Datepicker from "vuejs-datepicker";
import VueTelInput from "vue-tel-input";
Vue.use(VueTelInput, {
  dynamicPlaceholder: true,
  mode: "international"
});

export default {
  components: {
    Datepicker
  },

  mixins: [myMixins],

  data() {
    return {
      form: {
        id: null,
        job_title_id: null,
        first_name: null,
        last_name: null,
        gender: null,
        date_of_birth: null,
        email: null,
        phone: null,
        address: null,
        city: null,
        state_id: null,
        country_code: null,
        postal_code: null,
        career_summary: null,
        photo_url: null
      },
      photoForm: {
        photo: null
      },
      nameInitials: this.$store.state.auth.user.name_initials,
      avatarHovered: false
    };
  },

  computed: {
    ...mapState("cvs", {
      isLoading: state => state.loading,
      error: state => state.error,
      success: state => state.success,
      validationErrors: state => state.validationErrors,
      data: state => state.data,
      dataSet: state => state.dataSet,
      dataSetTotal: state => state.dataSetTotal,
      uploadProgress: state => state.uploadProgress
    }),
    formCountryCode: function() {
      return this.form.country_code;
    }
  },

  watch: {
    // eslint-disable-next-line
    data: function(newValue, oldValue) {
      let vm = this;
      if (newValue) {
        this.form = {
          id: newValue.id,
          job_title_id: newValue.job_title_id,
          first_name: newValue.first_name,
          last_name: newValue.last_name,
          gender: newValue.gender,
          date_of_birth: newValue.date_of_birth,
          email: newValue.email,
          phone: newValue.phone,
          address: newValue.address,
          city: newValue.city,
          state_id:
            newValue.country_code !== this.form.country_code &&
            this.form.country_code != null
              ? null
              : newValue.state_id,
          country_code: newValue.country_code,
          postal_code: newValue.postal_code,
          career_summary: newValue.career_summary,
          photo_url: newValue.photo_url
        };
        this.nameInitials = newValue.photo_url ? null : newValue.name_initials;

        setTimeout(() => {
          vm.$store.commit("cvs/REMOVE_ERROR_SUCCESS");
        }, 10000);
      }
    },

    // Watch and load states for selected country
    formCountryCode: function(newValue, oldValue) {
      if (newValue !== oldValue && oldValue != null) {
        this.form.state_id = null;
      }
      this.$store.commit("countries/SET_STATES_DATASET", {
        data: [],
        total: 0
      });
      if (newValue !== null) {
        this.loadStates();
      }
    }
  },

  created() {
    this.loadJobTitles();
    this.loadCountries();
  },

  methods: {
    loadJobTitles() {
      let vm = this;
      if (
        this.$store.state.jobTitles.dataSet.length <= 0 &&
        this.$store.state.jobTitles.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("jobTitles/list", payload);
      }
    }, // loadJobTitles()

    loadCountries() {
      let vm = this;
      if (
        this.$store.state.countries.dataSet.length <= 0 &&
        this.$store.state.countries.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("countries/list", payload);
      }
    }, // loadCountries()

    loadStates() {
      let vm = this;
      let payload = {
        per_page: "all", // -1 or all = all records
        sort_by: "name",
        sort_dir: "asc",
        archived: "no"
      };
      vm.$store.dispatch("countries/states", {
        id: this.form.country_code,
        payload: payload
      });
    }, // loadStates()

    // resetFormData() {
    //   this.form = {
    //     first_name: null,
    //     last_name: null,
    //     email: null
    //   };
    //   this.$refs.form.reset();
    // },

    updateProfile() {
      return new Promise((resolve, reject) => {
        let loader = this.$loading.show({}); // vue-loading-overlay option
        this.$store
          .dispatch("cvs/update", {
            id: this.form.id,
            payload: this.form
          })
          .then(() => {
            if (this.success !== false && this.error === false) {
              resolve(true);
            } else {
              this.$refs.form.setErrors(this.validationErrors); // set VeeValidation error
              reject(true);
            }
            loader.hide(); // vue-loading-overlay instance method
          });
      });
    },

    showUploadAvatar(hovered) {
      this.avatarHovered = hovered;
    },

    async selectPhotoFile(e) {
      this.photoForm.photo = e.target.files[0];
      this.uploadPhoto();
    },

    uploadPhoto() {
      let formData = new FormData();
      formData.append("photo", this.photoForm.photo);
      this.$store
        .dispatch("cvs/uploadPhoto", {
          id: this.form.id,
          payload: formData
        })
        .then(() => {
          if (this.success !== false && this.error === false) {
            // successful, re-fetch cv data
            let successMsg = this.success;
            this.$store.dispatch("cvs/view", this.form.id).then(() => {
              if (this.success !== false && this.error === false) {
                this.$store.commit("cvs/REMOVE_ERROR_SUCCESS");
              }
            });
            if (successMsg) {
              this.$swal.fire({
                toast: true,
                type: "success",
                title: "",
                text: successMsg,
                showConfirmButton: false,
                position: "top-start", // bottom-start | top | top-end
                background: "#d4edda", // success:#d4edda | error:#f8d7da | warning:#f9edbe
                timer: 5000
              });
            }
          } else {
            // this.$refs.uploadForm.setErrors(this.validationErrors); // set VeeValidation error
            const validationErrors = this.validationErrors;
            let errMsg = "";
            Object.keys(validationErrors).forEach(key => {
              errMsg += errMsg != "" ? "\n\r" : "";
              errMsg += validationErrors[key][0];
            });
            if (!errMsg) {
              errMsg += this.error;
            }
            this.$store.commit("cvs/REMOVE_ERROR_SUCCESS");
            if (errMsg) {
              this.$swal.fire({
                toast: true,
                type: "error",
                title: "",
                text: errMsg,
                showConfirmButton: false,
                position: "top-start", // bottom-start | top | top-end
                background: "#f8d7da", // success:#d4edda | error:#f8d7da | warning:#f9edbe
                timer: 5000
              });
            }
          }
        });
    }
  },

  head: {
    title: function() {
      return {
        inner: "CV Builder"
      };
    }
  }
};
</script>
