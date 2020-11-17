<template>
  <div>
    <vs-collapse>
      <div class="vx-row mb-5">
        <vx-card ref="filterCard" class="user-list-filters mb-8">
          <vs-collapse-item>
            <div slot="header">Search/Filter</div>
            <form
              @submit.prevent="handleSearch($event, 'filter')"
              @reset="handleSearch($event, 'reset')"
            >
              <div class="vx-row p-5">
                <div class="vx-col md:w-1/3 sm:w-1 w-full">
                  <label class="text-sm opacity-75">Skills</label>
                  <v-select
                    id="select-input-skill_ids"
                    v-model.trim="searchForm.skill_ids"
                    multiple
                    class="v-select custom-input000"
                    placeholder="Skill"
                    autocomplete="off"
                    :options="Object.values($store.state.skills.dataSet)"
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span v-if="$store.state.skills.loadingDataSet">
                        Loading data, please wait.
                      </span>
                      <span v-else>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-skill_ids"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </div>
                <div class="vx-col md:w-1/3 sm:w-1 w-full">
                  <label class="text-sm opacity-75">Job Titles</label>
                  <v-select
                    id="select-input-job_title_ids"
                    v-model.trim="searchForm.job_title_ids"
                    multiple
                    class="v-select custom-input000"
                    placeholder="Skill"
                    autocomplete="off"
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
                        id="input-job_title_ids"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </div>
                <div class="vx-col md:w-1/3 sm:w-1 w-full">
                  <label class="text-sm opacity-75">Experience</label>
                  <v-select
                    id="select-input-experience"
                    v-model.trim="searchForm.experience_years"
                    multiple
                    class="v-select custom-input000"
                    placeholder="Experience"
                    autocomplete="off"
                    :options="Object.values($_yearsOfExperienceDataSet())"
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
                        id="input-experience"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </div>
              </div>
              <div class="vx-row p-5">
                <div class="vx-col md:w-1/3 sm:w-1 w-full">
                  <label class="text-sm opacity-75">Languages</label>
                  <v-select
                    id="select-input-language_ids"
                    v-model.trim="searchForm.language_ids"
                    multiple
                    class="v-select custom-input000"
                    placeholder="Skill"
                    autocomplete="off"
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
                        id="input-language_ids"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </div>
                <div class="vx-col md:w-1/3 sm:w-1 w-full">
                  <label class="text-sm opacity-75">Course of Study</label>
                  <v-select
                    id="select-input-skill"
                    v-model.trim="searchForm.course_of_study_ids"
                    multiple
                    class="v-select custom-input000"
                    placeholder="Skill"
                    autocomplete="off"
                    :options="
                      Object.values($store.state.courseOfStudies.dataSet)
                    "
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span v-if="$store.state.courseOfStudies.loadingDataSet">
                        Loading data, please wait.
                      </span>
                      <span v-else>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-course_of_study_ids"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </div>
                <div class="vx-col md:w-1/3 sm:w-1 w-full">
                  <label class="text-sm opacity-75">Search</label>
                  <vs-input
                    v-model.trim="searchForm.search"
                    class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4"
                    placeholder="Search..."
                  />
                </div>
              </div>
              <div class="flex flex-wrap items-center justify-end mt-base">
                <vs-button
                  button="submit"
                  color="primary"
                  :disabled="isLoadingDataSet"
                >
                  <span v-show="!isLoadingDataSet">Fllter</span>
                  <span v-show="isLoadingDataSet">
                    <b-spinner small type="border"></b-spinner> Flltering...
                  </span>
                </vs-button>
                <vs-button
                  button="reset"
                  class="ml-5"
                  color="warning"
                  :disabled="isLoadingDataSet"
                >
                  Reset
                </vs-button>
              </div>
            </form>
          </vs-collapse-item>
        </vx-card>
      </div>
    </vs-collapse>

    <div class="vx-row">
      <div
        v-for="(cv, index) in dataSetList"
        :key="index"
        class="vx-col w-full lg:w-1/3 sm:w-1/2 mb-base"
      >
        <vx-card class="p-0 cursor-pointer expand-item" @click="previewCV(cv)">
          <div id="expand-icon">
            <i class="bx bx-expand"></i>
          </div>
          <div class="row">
            <div class="col-4 profile-img">
              <vs-avatar
                class="block"
                size="100px"
                :text="cv.name_initials"
                :src="cv.photo_url"
              />
            </div>
            <div class="col-8 flex justify-between text-left">
              <span>
                <p class="text-left mb-0 font-semibold text-uppercase">
                  {{ cv.name }}
                </p>
                <small class="text-primary text-uppercase">
                  {{ cv.job_title_name }}
                </small>
                <br />
                <small class="text-left text-primary">
                  {{ `${cv.experience_years} ${cv.experience_years_suffix}` }}
                  Work Experience.
                </small>
                <br />
                <small class="">
                  {{ $_truncateString(cv.career_summary, 70) }}
                </small>
              </span>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
    <div class="mt-4 text-center">
      <infinite-loading
        :identifier="infiniteLoadingId"
        @infinite="loadTalent"
      ></infinite-loading>
    </div>
    <!-- PDF Previewer Popup -->
    <vs-popup
      class="holamundo"
      :title="popupCvPreviewTitle"
      :active.sync="popupCvPreview"
      :fullscreen="popupCvPreviewFullscreen"
    >
      <b-overlay
        :show="loadingPdf"
        spinner-variant="secondary"
        spinner-type="grow"
        spinner-small
        rounded="sm"
        style=""
        bg-color="#D0D9E400"
        opacity="0.3"
      >
        <template v-slot:overlay>
          <div class="d-flex align-items-center">
            <b-spinner
              variant="secondary"
              type="grow"
              label="Loading..."
              style="width: 4rem; height: 4rem;"
            ></b-spinner>
            <!-- We add an SR only text for screen readers -->
            <span class="sr-only">Please wait...</span>
          </div>
        </template>
        <div v-show="loadingPdf" style="height: 80vh;"></div>
      </b-overlay>
      <div v-show="!loadingPdf">
        <div class="text-center">
          <b-button-toolbar key-nav aria-label="Toolbar">
            <b-button-group size="sm" class="mx-1">
              <b-button
                v-if="!isInvited"
                variant="outline-primary"
                @click="inviteTalent"
              >
                Invite Talent
              </b-button>
              <b-button v-if="isInvited" variant="outline-primary" disabled>
                Talent Invited
              </b-button>
            </b-button-group>
            <b-button-group size="sm" class="mx-1">
              <b-button variant="outline-secondary" @click="downloadCv">
                <feather-icon icon="DownloadIcon" class="" />
              </b-button>
              <!-- <b-button
                variant="outline-secondary"
                @click="$refs.cvPdfPage1.print()"
              >
                <feather-icon icon="PrinterIcon" class="" />
              </b-button> -->
            </b-button-group>
            <b-button-group size="sm" class="mx-1">
              <b-button
                variant="outline-secondary"
                @click="popupCvPreviewToggleFullscreen"
              >
                <feather-icon
                  v-if="popupCvPreviewFullscreen"
                  icon="Minimize2Icon"
                  class=""
                />
                <feather-icon v-else icon="MaximizeIcon" class="" />
              </b-button>
              <b-button
                v-b-tooltip.hover
                variant="outline-secondary"
                title="Close"
                @click="popupCvPreview = false"
              >
                <feather-icon icon="XIcon" class="" />
              </b-button>
            </b-button-group>
          </b-button-toolbar>
        </div>
        <vs-divider></vs-divider>
        <div v-for="p in pdfOptions.numPages" :key="p">
          <pdf
            :ref="`cvPdfPage${p}`"
            :src="pdfOptions.src"
            :page="p"
            style="display: inline-block; width: 100%"
            @page-loaded="pdfPageLoaded($event)"
          ></pdf>
          <vs-divider>Page {{ p }}/{{ pdfOptions.numPages }}</vs-divider>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<style lang="scss">
.profile-img {
  border-right: 0.5px solid rgba(0, 0, 0, 0.082);
}
.expand-item {
  &:hover {
    z-index: 2 !important;
    background-color: #c3c3c3;
    cursor: pointer;
    #expand-icon {
      display: inline;
    }
  }
}
#expand-icon {
  position: absolute;
  top: 50%;
  display: none;
  z-index: 999;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>

<script>
import { mapState } from "vuex";
import pdf from "vue-pdf";
import myMixins from "../../mixins/myMixins.js";

export default {
  components: {
    pdf
  },

  mixins: [myMixins],

  data() {
    return {
      perPage: 50, // 50, -1 or all = all records,
      page: 1,
      dataSetList: [],
      infiniteLoadingId: +new Date(),
      searchForm: {
        skill_ids: [],
        job_title_ids: [],
        experience_years: [],
        language_ids: [],
        course_of_study_ids: [],
        search: null
      },
      searchFormPayload: {},
      cvData: {},
      jobInvitationData: {},
      popupCvPreview: false,
      popupCvPreviewFullscreen: false,
      popupCvPreviewTitle: "CV",
      pdfOptions: {
        src: null,
        numPages: undefined
      },
      loadingPdf: false
    };
  },

  computed: {
    ...mapState("cvs", {
      isLoading: state => state.loading,
      isLoadingDataSet: state => state.loadingDataSet,
      error: state => state.error,
      success: state => state.success,
      validationErrors: state => state.validationErrors,
      data: state => state.data,
      dataSet: state => state.dataSet,
      dataSetTotal: state => state.dataSetTotal
    }),
    isInvited: function() {
      if (this.cvData.id && this.jobInvitationData.talent_cv_id) {
        if (this.cvData.id == this.jobInvitationData.talent_cv_id) {
          return true;
        }
      }
      return false;
    }
  },

  watch: {
    // eslint-disable-next-line
    popupCvPreview: function(newValue, oldValue) {
      if (newValue === false) {
        // reset options
        this.pdfOptions = {
          src: null,
          numPages: undefined
        };
      }
    }
  },

  created() {
    this.loadSkills();
    this.loadJobTitles();
    this.loadCourseOfStudies();
    this.loadLanguages();
  },

  methods: {
    loadSkills() {
      let vm = this;
      if (
        this.$store.state.skills.dataSet.length <= 0 &&
        this.$store.state.skills.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("skills/list", payload);
      }
    }, // loadSkills()

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

    loadTalent(infiniteLoadingState) {
      if (this.isLoadingDataSet !== true) {
        let payload = {
          per_page: this.perPage, // -1 or all = all records
          page: this.page,
          sort_by: "first_name", //
          sort_dir: "asc",
          published: "yes",
          ...this.searchFormPayload
        };
        this.$store.dispatch("cvs/list", payload).then(() => {
          this.$store.commit("cvs/REMOVE_ERROR_SUCCESS");
          if (this.dataSet.length) {
            this.page += 1;
            this.dataSetList.push(...this.dataSet);
            infiniteLoadingState.loaded();
          } else {
            infiniteLoadingState.complete();
          }
        });
      }
    }, // loadTalents()

    handleSearch(e, action = "filter") {
      if (action == "reset") {
        // clear form and data
        // e.target.reset();
        this.resetSearchFormData();
      }
      this.searchFormPayload = this.searchForm;
      // the following options reloads infinite loading.
      this.page = 1;
      this.dataSetList = [];
      this.infiniteLoadingId += 1;
    },

    resetSearchFormData() {
      this.searchForm = {
        skill_ids: [],
        job_title_ids: [],
        experience_years: [],
        language_ids: [],
        course_of_study_ids: [],
        search: null
      };
    },

    previewCV(cvData) {
      this.loadingPdf = true;
      this.cvData = cvData;
      this.popupCvPreviewTitle = `${cvData.name}'s CV`;
      this.popupCvPreview = true;
      // reload cv data
      this.$store.dispatch("cvs/view", this.cvData.id).then(() => {
        if (
          this.$store.state.cvs.success !== false &&
          this.$store.state.cvs.error === false
        ) {
          this.$store.commit("cvs/REMOVE_ERROR_SUCCESS");
          this.cvData = this.$store.state.cvs.data;

          // check job invitation record for existence
          let form = {
            employer_user_id: this.$store.state.auth.user.id,
            talent_user_id: this.cvData.user_id,
            talent_cv_id: this.cvData.id
          };
          this.$store.dispatch("jobInvitations/check", form).then(() => {
            if (
              this.$store.state.jobInvitations.success !== false &&
              this.$store.state.jobInvitations.error === false
            ) {
              this.jobInvitationData = this.$store.state.jobInvitations.data;
              this.$store.commit("jobInvitations/REMOVE_ERROR_SUCCESS");
            }
          });

          // create pdf loading task
          let url = cvData.pdf_url;
          this.pdfOptions.src = pdf.createLoadingTask(url);
          this.pdfOptions.src.promise.then(pdf => {
            this.pdfOptions.numPages = pdf.numPages;
          });
        }
      });
    },

    pdfPageLoaded(e) {
      if (e != "undefined" && e >= this.pdfOptions.numPages) {
        this.loadingPdf = false;
      }
    },

    popupCvPreviewToggleFullscreen() {
      this.popupCvPreviewFullscreen = !this.popupCvPreviewFullscreen;
    },

    downloadCv() {
      if (this.cvData.pdf_download_url) {
        // window.location = this.cvData.pdf_download_url;
        window.open(this.cvData.pdf_download_url, "_blank");
        // win.focus();
      }
    },

    inviteTalent() {
      let vm = this;
      if (this.cvData.id) {
        // let vm = this;
        this.$swal
          .fire({
            type: "warning",
            title: `Job Invitation?`,
            html: `Invite <b>${this.cvData.name}</b> for a job interview or job.`,
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
              let form = {
                employer_user_id: this.$store.state.auth.user.id,
                talent_user_id: this.cvData.user_id,
                talent_cv_id: this.cvData.id
              };
              return this.$store
                .dispatch("jobInvitations/create", form)
                .then(() => {
                  if (
                    this.$store.state.jobInvitations.success !== false &&
                    this.$store.state.jobInvitations.error === false
                  ) {
                    this.jobInvitationData = this.$store.state.jobInvitations.data;
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
                let msg = this.$store.state.jobInvitations.success;
                this.$store.commit("jobInvitations/REMOVE_ERROR_SUCCESS");
                this.$swal.fire("", msg, "success").then(function() {
                  // reload cv data
                  vm.$store.dispatch("cvs/view", vm.cvData.id).then(() => {
                    if (
                      this.$store.state.cvs.success !== false &&
                      this.$store.state.cvs.error === false
                    ) {
                      this.$store.commit("cvs/REMOVE_ERROR_SUCCESS");
                      vm.cvData = this.$store.state.cvs.data;
                    }
                  });
                });
              } else {
                let msg = this.$store.state.jobInvitations.error;
                this.$store.commit("jobInvitations/REMOVE_ERROR_SUCCESS");
                this.$swal.fire("", msg, "error");
              }
            }
          }); // this.$swal.fire({...}).then({...})
      }
    }
  }
};
</script>
