<template>
  <div id="scroll-to-container">
    <h2
      id="cvLanguages-scroll-to-content"
      class="card-title mb-2 mt-2 text-center"
    >
      Languages
    </h2>
    <h6 class="mb-5 text-center">
      Tell us about your language and proficiency.
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
            <vs-collapse-item v-for="(language, index) in dataSet" :key="index">
              <div slot="header">
                <strong class="text-capitalize">
                  {{ language.language_name }} -
                  {{ $_languageLevelDataSet()[language.level].name }}
                  <!--  -->
                </strong>
              </div>
              <!--  -->
              <div class="text-right">
                <b-button
                  v-b-tooltip.hover
                  type="button"
                  variant="outline-secondary"
                  class="mr-2"
                  size="sm"
                  title="Edit"
                  @click="editRecord(language)"
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
                    deleteRecord(language.id, `${language.language_name}`)
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
          Add Language
        </a>
      </b-col>
    </b-row>

    <div id="cvLanguages-scroll-to-form">
      <div v-if="form.show">
        <hr />
        <h4 v-show="!form.editMode">Add Language</h4>
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
            <!-- Language and Level field -->
            <b-row>
              <b-col md="6">
                <!-- Language field -->
                <validation-provider
                  v-slot="validationContext"
                  vid="language_id"
                  name="Language"
                  rules="required"
                >
                  <b-form-group
                    label="Language"
                    label-for="input-language_id"
                    label-class="required"
                    description=""
                    :invalid-feedback="validationContext.errors[0]"
                    valid-feedback=""
                    :state="$_getFormValidationState(validationContext)"
                  >
                    <v-select
                      id="select-input-language_id"
                      v-model.trim="form.language_id"
                      class="v-select custom-input000"
                      placeholder="Language"
                      autocomplete="off"
                      :class="{ 'is-invalid': validationContext.errors[0] }"
                      :options="Object.values($store.state.languages.dataSet)"
                      label="name"
                      :reduce="option => option.id"
                      append-to-body
                      :calculate-position="withPopper"
                    >
                      <template v-slot:no-options>
                        <span v-if="$store.state.languages.loadingDataSet">
                          Loading data, please wait.
                        </span>
                        <span v-else>Sorry, no matching options.</span>
                      </template>
                      <template v-slot:option="option">
                        {{ option.name }}
                      </template>
                      <template v-slot:search="{ attributes, events }">
                        <input
                          id="input-language_id"
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
                <!-- Level field -->
                <validation-provider
                  v-slot="validationContext"
                  vid="level"
                  name="Proficiency/Level"
                  rules="required"
                >
                  <b-form-group
                    label="Proficiency/Level"
                    label-for="input-level"
                    label-class="required"
                    description=""
                    :invalid-feedback="validationContext.errors[0]"
                    valid-feedback=""
                    :state="$_getFormValidationState(validationContext)"
                  >
                    <div class="radio-group toggle">
                      <span
                        v-for="(level, index) in $_languageLevelDataSet()"
                        :key="index"
                      >
                        <input
                          :id="`language-option-${level.id}`"
                          v-model.trim="form.level"
                          type="radio"
                          name="selector"
                          :value="level.id"
                        />
                        <label
                          :for="`language-option-${level.id}`"
                          class="text-center"
                        >
                          {{ level.name }}
                          <star-rating
                            v-if="level.id === 'basic'"
                            inactive-color="#00ec83"
                            active-color="#ffffff"
                            :rating="0"
                            :max-rating="1"
                            :star-size="20"
                            :show-rating="false"
                            :read-only="true"
                          ></star-rating>
                          <star-rating
                            v-if="level.id === 'intermediate'"
                            inactive-color="#00ec83"
                            active-color="#ffffff"
                            :rating="0"
                            :max-rating="2"
                            :star-size="20"
                            :show-rating="false"
                            :read-only="true"
                          ></star-rating>
                          <star-rating
                            v-if="level.id === 'advanced'"
                            inactive-color="#00ec83"
                            active-color="#ffffff"
                            :rating="0"
                            :max-rating="3"
                            :star-size="20"
                            :show-rating="false"
                            :read-only="true"
                          ></star-rating>
                        </label>
                      </span>
                    </div>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>

            <!-- Buttons -->
            <div class="text-center">
              <b-button
                v-if="!form.editMode"
                :disabled="isLoading || invalid"
                type="submit"
                variant="outline-primary mr-2"
                size=""
              >
                <span v-show="!isLoading">Add Language</span>
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

import Vue from "vue";
import VueTelInput from "vue-tel-input";
import StarRating from "vue-star-rating";

Vue.use(VueTelInput, {
  dynamicPlaceholder: true,
  mode: "international"
});

export default {
  components: {
    StarRating
  },

  mixins: [myMixins],

  data() {
    return {
      recordsLoading: false,
      form: {
        show: false,
        editMode: false,
        editModeTitle: null,
        id: null,
        language_id: null,
        level: null
      }
    };
  },

  computed: {
    ...mapState("cvs", {
      cvsData: state => state.data
    }),
    ...mapState("cvLanguages", {
      isLoading: state => state.loading,
      error: state => state.error,
      success: state => state.success,
      validationErrors: state => state.validationErrors,
      data: state => state.data,
      dataSet: state => state.dataSet,
      dataSetTotal: state => state.dataSetTotal
    })
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
        vm.$store.commit("cvLanguages/REMOVE_ERROR_SUCCESS");
      }, 10000);
    }
  },

  created() {
    this.loadLanguages();
  },

  methods: {
    loadLanguages() {
      let vm = this;
      if (
        this.$store.state.languages.dataSet.length <= 0 &&
        this.$store.state.languages.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("languages/list", payload);
      }
    }, // loadLanguages()

    openForm() {
      this.form.show = true;
      this.$scrollTo("#cvLanguages-scroll-to-form");
      this.$store.commit("cvLanguages/REMOVE_ERROR_SUCCESS");
    },

    closeForm() {
      this.resetFormData();
      this.form.show = false;
      this.$scrollTo("#cvLanguages-scroll-to-content");
    },

    resetFormData() {
      this.form = {
        show: false,
        editMode: false,
        editModeTitle: null,
        id: null,
        language_id: null,
        level: null
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
        sort_by: "created_at",
        sort_dir: "asc"
      };
      vm.$store
        .dispatch("cvLanguages/list", {
          cv_id: this.$store.state.cvs.data.id,
          payload: payload
        })
        .then(() => {
          this.recordsLoading = false;
        });
    }, // loadRecords()

    createRecord() {
      this.$store
        .dispatch("cvLanguages/create", {
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

    editRecord(languageData) {
      this.form = {
        show: true,
        editMode: true,
        editModeTitle: `${languageData.language_name}`,
        id: languageData.id,
        language_id: languageData.language_id,
        level: languageData.level
      };
      this.openForm();
    },

    updateRecord() {
      this.$store
        .dispatch("cvLanguages/update", {
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
              .dispatch("cvLanguages/delete", {
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
              this.$store.commit("cvLanguages/REMOVE_ERROR_SUCCESS");
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
