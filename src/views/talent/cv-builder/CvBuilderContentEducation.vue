<template>
  <div id="scroll-to-container">
    <h2
      id="cvEducations-scroll-to-content"
      class="card-title mb-2 mt-2 text-center"
    >
      Education
    </h2>
    <h6 class="mb-5 text-center">
      Start with your recent university.
    </h6>

    <b-row v-show="!form.show" class="mb-1">
      <b-col cols="12">
        <p v-if="error">
          <b-alert variant="danger" show>{{ error }}</b-alert>
        </p>
        <p v-if="success">
          <b-alert variant="success" show>{{ success }}</b-alert>
        </p>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <!-- <hr v-if="dataSetTotal > 0" /> -->
        <b-overlay
          :show="recordsLoading"
          spinner-variant="secondary"
          spinner-type="grow"
          rounded="sm"
          bg-color="#D0D9E4"
          opacity="0.2"
        >
          <vs-collapse accordion type="border">
            <vs-collapse-item
              v-for="(education, index) in dataSet"
              :key="index"
            >
              <div slot="header">
                <strong class="text-capitalize">
                  {{ education.degree_name }}
                  {{ education.course_of_study_name }}, {{ education.school }},
                  {{ education.city }}
                </strong>
                <br />
                {{ education.start_date | moment("MMM YYYY") }}
                &#8212;
                <span v-if="!education.is_current">
                  {{ education.end_date | moment("MMM YYYY") }}
                </span>
                <span v-else>Present</span>
              </div>
              {{ education.description }}
              <div class="text-right">
                <b-button
                  v-b-tooltip.hover
                  type="button"
                  variant="outline-secondary"
                  class="mr-2"
                  size="sm"
                  title="Edit"
                  @click="editRecord(education)"
                >
                  <i class="bx bx-edit-alt"></i>
                </b-button>
                <b-button
                  v-b-tooltip.hover
                  type="button"
                  variant="outline-danger"
                  size="sm"
                  title="Delete"
                  @click="
                    deleteRecord(
                      education.id,
                      `${education.degree_name} ${education.course_of_study_name}, ${education.school}`
                    )
                  "
                >
                  <i class="bx bxs-trash"></i>
                </b-button>
              </div>
            </vs-collapse-item>
          </vs-collapse>
        </b-overlay>
      </b-col>
    </b-row>

    <b-row v-if="!form.show && dataSetTotal < 100">
      <b-col cols="12" class="text-center mt-2">
        <a class="btn btn-link text-primary" @click="openForm">
          <i class="bx bx-plus-circle font-weight-bold"></i>
          Add Education History
        </a>
      </b-col>
    </b-row>

    <div id="cvEducations-scroll-to-form">
      <div v-if="form.show">
        <hr />
        <h4 v-show="!form.editMode">Add Education History</h4>
        <h4 v-show="form.editMode">Editing: {{ form.editModeTitle }}</h4>
        <b-row v-show="form.show" class="mb-1">
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
          <form
            class="w-full"
            @submit.prevent="
              form.editMode
                ? handleSubmit(updateRecord)
                : handleSubmit(createRecord)
            "
          >
            <!-- School field -->
            <validation-provider
              v-slot="validationContext"
              vid="school"
              name="School"
              rules="required|max:100"
            >
              <b-form-group
                label="School"
                label-for="input-school"
                label-class="required"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <b-form-input
                  id="input-school"
                  v-model.trim="form.school"
                  class="custom-input"
                  type="text"
                  placeholder="School"
                  maxlength="100"
                  autocomplete="off"
                  :state="$_getFormValidationState(validationContext)"
                  trim
                  size="lg"
                ></b-form-input>
              </b-form-group>
            </validation-provider>

            <!-- Course of Study and Degree field -->
            <b-row>
              <b-col md="6">
                <!-- Course of Study field -->
                <validation-provider
                  v-slot="validationContext"
                  vid="course_of_study_id"
                  name="Course of Study"
                  rules="required"
                >
                  <b-form-group
                    label="Course of Study"
                    label-for="input-course_of_study_id"
                    label-class="required"
                    description=""
                    :invalid-feedback="validationContext.errors[0]"
                    valid-feedback=""
                    :state="$_getFormValidationState(validationContext)"
                  >
                    <v-select
                      id="select-input-course_of_study_id"
                      v-model.trim="form.course_of_study_id"
                      class="v-select custom-input000"
                      placeholder="Course of Study"
                      autocomplete="off"
                      :class="{ 'is-invalid': validationContext.errors[0] }"
                      :options="
                        Object.values($store.state.courseOfStudies.dataSet)
                      "
                      label="name"
                      :reduce="option => option.id"
                      append-to-body
                      :calculate-position="withPopper"
                    >
                      <template v-slot:no-options>
                        <span
                          v-if="$store.state.courseOfStudies.loadingDataSet"
                        >
                          Loading data, please wait.
                        </span>
                        <span v-else>Sorry, no matching options.</span>
                      </template>
                      <template v-slot:option="option">
                        {{ option.name }}
                      </template>
                      <template v-slot:search="{ attributes, events }">
                        <input
                          id="input-course_of_study_id"
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
                <!-- Degree field -->
                <validation-provider
                  v-slot="validationContext"
                  vid="degree_id"
                  name="Degree"
                  rules="required"
                >
                  <b-form-group
                    label="Degree"
                    label-for="input-degree_id"
                    label-class="required"
                    description=""
                    :invalid-feedback="validationContext.errors[0]"
                    valid-feedback=""
                    :state="$_getFormValidationState(validationContext)"
                  >
                    <v-select
                      id="select-input-degree_id"
                      v-model.trim="form.degree_id"
                      class="v-select custom-input000"
                      placeholder="Degree"
                      autocomplete="off"
                      :class="{ 'is-invalid': validationContext.errors[0] }"
                      :options="Object.values($store.state.degrees.dataSet)"
                      label="name"
                      :reduce="option => option.id"
                      append-to-body
                      :calculate-position="withPopper"
                    >
                      <template v-slot:no-options>
                        <span v-if="$store.state.degrees.loadingDataSet">
                          Loading data, please wait.
                        </span>
                        <span v-else>Sorry, no matching options.</span>
                      </template>
                      <template v-slot:option="option">
                        {{ option.name }}
                      </template>
                      <template v-slot:search="{ attributes, events }">
                        <input
                          id="input-degree_id"
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

            <!-- City and Country field -->
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
            </b-row>

            <!-- Start Date and End Date field -->
            <b-row>
              <b-col md="6">
                <!-- Start Date field -->
                <validation-provider
                  v-slot="validationContext"
                  vid="start_date"
                  name="Start Date"
                  rules="required"
                >
                  <b-form-group
                    label="Start Date"
                    label-for="input-start-date"
                    label-class="required"
                    description=""
                    :invalid-feedback="validationContext.errors[0]"
                    valid-feedback=""
                    :state="$_getFormValidationState(validationContext)"
                  >
                    <datepicker
                      id="input-start-date"
                      v-model.trim="form.start_date"
                      input-class="custom-input p-4"
                      type="date"
                      placeholder="Start Date"
                      autocomplete="off"
                      :state="$_getFormValidationState(validationContext)"
                      typeable
                      bootstrap-styling
                      required
                    ></datepicker>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md="6">
                <!-- End Date field -->
                <validation-provider
                  v-slot="validationContext"
                  vid="end_date"
                  name="End Date"
                  rules=""
                >
                  <b-form-group
                    label="End Date"
                    label-for="input-end-date"
                    description=""
                    :invalid-feedback="validationContext.errors[0]"
                    valid-feedback=""
                    :state="$_getFormValidationState(validationContext)"
                  >
                    <datepicker
                      id="input-end-date"
                      v-model.trim="form.end_date"
                      input-class="custom-input p-4"
                      type="date"
                      placeholder="End Date"
                      autocomplete="off"
                      :state="$_getFormValidationState(validationContext)"
                      typeable
                      bootstrap-styling
                    ></datepicker>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>

            <!--  I Currently Study Here fields -->
            <div class="center content-inputs">
              <b-form-checkbox
                v-model="form.is_current"
                :value="true"
                :unchecked-value="false"
                size="md"
                class="mb-5"
              >
                I Currently Study Here
              </b-form-checkbox>
            </div>

            <!-- Description field -->
            <validation-provider
              v-slot="validationContext"
              vid="description"
              name="Description"
              rules="max:500"
            >
              <b-form-group
                label="Description"
                label-for="input-description"
                description=""
                :invalid-feedback="validationContext.errors[0]"
                valid-feedback=""
                :state="$_getFormValidationState(validationContext)"
              >
                <b-form-textarea
                  id="input-description"
                  v-model.trim="form.description"
                  class="custom-input"
                  placeholder="Description"
                  maxlength="500"
                  rows="2"
                  :state="$_getFormValidationState(validationContext)"
                  trim
                  size="lg"
                ></b-form-textarea>
              </b-form-group>
            </validation-provider>

            <!-- Buttons -->
            <div class="text-center">
              <b-button
                v-if="!form.editMode"
                :disabled="isLoading || invalid"
                type="submit"
                variant="outline-primary mr-2"
                size=""
              >
                <span v-show="!isLoading">Add Education History</span>
                <span v-show="isLoading">
                  <b-spinner small type="border"></b-spinner> Creating...
                </span>
              </b-button>
              <b-button
                v-else
                :disabled="isLoading || invalid"
                type="submit"
                variant="outline-primary mr-2"
                size=""
              >
                <span v-show="!isLoading">Save Changes</span>
                <span v-show="isLoading">
                  <b-spinner small type="border"></b-spinner> Saving...
                </span>
              </b-button>
              <b-button
                type="reset"
                variant="outline-secondary"
                size=""
                @click="closeForm"
              >
                Cancel
              </b-button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
//
</style>
<script>
import { mapState } from "vuex";
import myMixins from "../../../mixins/myMixins.js";
import Datepicker from "vuejs-datepicker";

import Vue from "vue";
import VueTelInput from "vue-tel-input";

Vue.use(VueTelInput, {
  dynamicPlaceholder: true,
  mode: "international"
});

export default {
  mixins: [myMixins],

  data() {
    return {
      recordsLoading: false,
      form: {
        show: false,
        editMode: false,
        editModeTitle: null,
        id: null,
        school: null,
        degree_id: null,
        course_of_study_id: null,
        city: null,
        country_code: null,
        start_date: null,
        end_date: null,
        is_current: false,
        description: null
      }
    };
  },

  computed: {
    ...mapState("cvs", {
      cvsData: state => state.data
    }),
    ...mapState("cvEducations", {
      isLoading: state => state.loading,
      error: state => state.error,
      success: state => state.success,
      validationErrors: state => state.validationErrors,
      data: state => state.data,
      dataSet: state => state.dataSet,
      dataSetTotal: state => state.dataSetTotal
    })
  },
  // eslint-disable-next-line vue/order-in-components
  components: {
    Datepicker
  },

  watch: {
    // eslint-disable-next-line
    cvsData: function(newValue, oldValue) {
      if (newValue && oldValue) {
        if (newValue.id != null && oldValue.id == null) {
          this.loadRecords();
        }
      }
    },
    // eslint-disable-next-line
    dataSet: function(newValue, oldValue) {
      let vm = this;
      setTimeout(() => {
        vm.$store.commit("cvEducations/REMOVE_ERROR_SUCCESS");
      }, 10000);
    }
  },

  created() {
    this.loadCourseOfStudies();
    this.loadDegrees();
    this.loadCountries();
  },

  methods: {
    loadCourseOfStudies() {
      let vm = this;
      if (
        this.$store.state.courseOfStudies.dataSet.length <= 0 &&
        this.$store.state.courseOfStudies.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("courseOfStudies/list", payload);
      }
    }, // loadCourseOfStudies()

    loadDegrees() {
      let vm = this;
      if (
        this.$store.state.degrees.dataSet.length <= 0 &&
        this.$store.state.degrees.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("degrees/list", payload);
      }
    }, // loadDegrees()

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

    openForm() {
      this.form.show = true;
      this.$scrollTo("#cvEducations-scroll-to-form");
      this.$store.commit("cvEducations/REMOVE_ERROR_SUCCESS");
    },

    closeForm() {
      this.resetFormData();
      this.form.show = false;
      this.$scrollTo("#cvEducations-scroll-to-content");
    },

    resetFormData() {
      this.form = {
        show: false,
        editMode: false,
        editModeTitle: null,
        id: null,
        school: null,
        degree_id: null,
        course_of_study_id: null,
        city: null,
        country_code: null,
        start_date: null,
        end_date: null,
        is_current: false,
        description: null
      };
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },

    loadRecords() {
      let vm = this;
      this.recordsLoading = true;
      let payload = {
        per_page: "all", // -1 or all = all records
        sort_by: "start_date",
        sort_dir: "desc",
        archived: "no"
      };
      vm.$store
        .dispatch("cvEducations/list", {
          cv_id: this.$store.state.cvs.data.id,
          payload: payload
        })
        .then(() => {
          this.recordsLoading = false;
        });
    }, // loadRecords()

    createRecord() {
      this.$store
        .dispatch("cvEducations/create", {
          cv_id: this.$store.state.cvs.data.id,
          payload: this.form
        })
        .then(() => {
          if (this.success !== false && this.error === false) {
            this.closeForm();
            this.loadRecords();
          } else {
            this.$refs.form.setErrors(this.validationErrors); // set VeeValidation error
          }
        });
    },

    editRecord(educationData) {
      this.form = {
        show: true,
        editMode: true,
        editModeTitle: `${educationData.degree_name} ${educationData.course_of_study_name}, ${educationData.school}`,
        id: educationData.id,
        school: educationData.school,
        degree_id: educationData.degree_id,
        course_of_study_id: educationData.course_of_study_id,
        city: educationData.city,
        country_code: educationData.country_code,
        start_date: educationData.start_date,
        end_date: educationData.end_date,
        is_current: educationData.is_current,
        description: educationData.description
      };
      this.openForm();
    },

    updateRecord() {
      this.$store
        .dispatch("cvEducations/update", {
          cv_id: this.$store.state.cvs.data.id,
          work_experience_id: this.form.id,
          payload: this.form
        })
        .then(() => {
          if (this.success !== false && this.error === false) {
            this.closeForm();
            this.loadRecords();
          } else {
            this.$refs.form.setErrors(this.validationErrors); // set VeeValidation error
          }
        });
    },

    deleteRecord(id, name = "") {
      this.$swal
        .fire({
          type: "warning",
          title: `Are you sure you want to delete "${name}"?`,
          text:
            "This action cannot be undone and will permanently delete this record and its associated records.",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-danger mx-2",
            cancelButton: "btn btn-secondary mx-2"
          },
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.$store
              .dispatch("cvEducations/delete", {
                cv_id: this.$store.state.cvs.data.id,
                work_experience_id: id
              })
              .then(() => {
                if (this.success !== false && this.error === false) {
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
              let msg = this.success;
              this.$store.commit("cvEducations/REMOVE_ERROR_SUCCESS");
              this.closeForm();
              this.loadRecords();
              this.$swal.fire("", msg, "success");
            } else {
              let msg = this.error;
              this.$swal.fire("", msg, "error");
            }
          }
        }); // this.$swal.fire({...})
    } // deleteRecord()
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
