<template>
  <div id="scroll-to-container">
    <h2
      id="cvAwards-scroll-to-content"
      class="card-title mb-2 mt-2 text-center"
    >
      Honour and Awards
    </h2>
    <h6 class="mb-5 text-center"></h6>

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
            <vs-collapse-item v-for="(award, index) in dataSet" :key="index">
              <div slot="header">
                <strong class="text-capitalize"
                  >{{ award.title }} - {{ award.organization }}</strong
                >
                <br />
                {{ award.date | moment("MMM YYYY") }}
              </div>
              {{ award.description }}
              <div class="text-right">
                <b-button
                  v-b-tooltip.hover
                  type="button"
                  variant="outline-secondary"
                  class="mr-2"
                  size="sm"
                  title="Edit"
                  @click="editRecord(award)"
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
                      award.id,
                      `${award.title} - ${award.organization}`
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
          Add Award
        </a>
      </b-col>
    </b-row>

    <div id="cvAwards-scroll-to-form">
      <div v-if="form.show">
        <hr />
        <h4 v-show="!form.editMode">Add Award</h4>
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
            <!-- Title and Organization field -->
            <b-row>
              <b-col md="6">
                <!-- School field -->
                <validation-provider
                  v-slot="validationContext"
                  vid="title"
                  name="Title"
                  rules="required|max:50"
                >
                  <b-form-group
                    label="Title"
                    label-for="input-title"
                    label-class="required"
                    description=""
                    :invalid-feedback="validationContext.errors[0]"
                    valid-feedback=""
                    :state="$_getFormValidationState(validationContext)"
                  >
                    <b-form-input
                      id="input-title"
                      v-model.trim="form.title"
                      class="custom-input"
                      type="text"
                      placeholder="Title"
                      maxlength="50"
                      autocomplete="off"
                      :state="$_getFormValidationState(validationContext)"
                      trim
                      size="lg"
                    ></b-form-input>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md="6">
                <!-- Date field -->
                <validation-provider
                  v-slot="validationContext"
                  vid="date"
                  name="Date"
                  rules="required"
                >
                  <b-form-group
                    label="Date"
                    label-for="input-date"
                    label-class="required"
                    description=""
                    :invalid-feedback="validationContext.errors[0]"
                    valid-feedback=""
                    :state="$_getFormValidationState(validationContext)"
                  >
                    <datepicker
                      id="input-date"
                      v-model.trim="form.date"
                      input-class="custom-input p-4"
                      type="date"
                      placeholder="Date"
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

            <!-- Date field -->
            <b-row>
              <b-col md="12">
                <!-- Organization field -->
                <validation-provider
                  v-slot="validationContext"
                  vid="organization"
                  name="Organization"
                  rules="required|max:100"
                >
                  <b-form-group
                    label="Organization"
                    label-for="input-organization"
                    label-class="required"
                    description=""
                    :invalid-feedback="validationContext.errors[0]"
                    valid-feedback=""
                    :state="$_getFormValidationState(validationContext)"
                  >
                    <b-form-input
                      id="input-organization"
                      v-model.trim="form.organization"
                      class="custom-input"
                      type="text"
                      placeholder="Organization"
                      maxlength="100"
                      autocomplete="off"
                      :state="$_getFormValidationState(validationContext)"
                      trim
                      size="lg"
                    ></b-form-input>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>

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
                <span v-show="!isLoading">Add Award</span>
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
        title: null,
        organization: null,
        date: null,
        description: null
      }
    };
  },

  computed: {
    ...mapState("cvs", {
      cvsData: state => state.data
    }),
    ...mapState("cvAwards", {
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
        vm.$store.commit("cvAwards/REMOVE_ERROR_SUCCESS");
      }, 10000);
    }
  },

  created() {
    //
  },

  methods: {
    openForm() {
      this.form.show = true;
      this.$scrollTo("#cvAwards-scroll-to-form");
      this.$store.commit("cvAwards/REMOVE_ERROR_SUCCESS");
    },

    closeForm() {
      this.resetFormData();
      this.form.show = false;
      this.$scrollTo("#cvAwards-scroll-to-content");
    },

    resetFormData() {
      this.form = {
        show: false,
        editMode: false,
        editModeTitle: null,
        id: null,
        title: null,
        organization: null,
        date: null,
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
        sort_by: "date",
        sort_dir: "desc"
      };
      vm.$store
        .dispatch("cvAwards/list", {
          cv_id: this.$store.state.cvs.data.id,
          payload: payload
        })
        .then(() => {
          this.recordsLoading = false;
        });
    }, // loadRecords()

    createRecord() {
      this.$store
        .dispatch("cvAwards/create", {
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

    editRecord(awardData) {
      this.form = {
        show: true,
        editMode: true,
        editModeTitle: `${awardData.title}, ${awardData.organization}`,
        id: awardData.id,
        title: awardData.title,
        organization: awardData.organization,
        date: awardData.date,
        description: awardData.description
      };
      this.openForm();
    },

    updateRecord() {
      this.$store
        .dispatch("cvAwards/update", {
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
              .dispatch("cvAwards/delete", {
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
              this.$store.commit("cvAwards/REMOVE_ERROR_SUCCESS");
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
