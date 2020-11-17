<template>
  <b-container id="cvBuilder-scroll-to-top" fluid class="cv-body">
    <router-link
      :to="{ name: 'dashboard' }"
      class="float"
      style="position: fixed;"
    >
      <i class="bx bx-x"></i>
    </router-link>
    <b-row class="cv-container">
      <b-col order="5" md class="cv-right text-center">
        <!-- CV Preview -->
        <div
          style="position: fixed; height: 90vh; margin: 40px 40px 10px 10px; padding-bottom: 30px;"
        >
          <vuescroll :ops="vuescrollOps">
            <cv-previewer></cv-previewer>
          </vuescroll>
        </div>
      </b-col>
      <b-col order="1" md class="register-left" style="min-height: 100vh;">
        <b-row class="cv-logo">
          <router-link :to="{ name: 'dashboard' }">
            <img
              alt="Vue logo"
              src="@/assets/images/logo.png"
              width="300"
              class="float-left"
            />
          </router-link>
        </b-row>
        <div class="cv-builder">
          <div class="text-center">
            <vs-button class="ml-auto mt-2" @click="importLinkedIn">
              <feather-icon
                icon="LinkedinIcon"
                svg-classes="w-5 h-5"
                class="pt-2 mr-4 pr-3"
                style="border-right: 1px solid #fff;"
              />
              <span class="pb-5">
                Import LinkedIn Profile
              </span>
            </vs-button>
          </div>
          <form-wizard
            title="CV BUILDER"
            subtitle="Please read and follow the steps carefully."
            color="#0040a1"
            shape="circle"
            step-size="sm"
            :start-index="0"
            transition="fade"
            finish-button-text="Finish"
            @on-complete="onComplete"
          >
            <!-- Step 1  -->
            <tab-content
              title="Profile"
              icon="feather icon-users"
              :before-change="processProfileTab"
            >
              <cv-builder-tab-profile
                ref="cvBuilderTabProfile"
              ></cv-builder-tab-profile>
            </tab-content>

            <!-- Step 2 -->
            <tab-content
              title="Experience"
              icon="feather icon-briefcase"
              :before-change="processWorkExperienceTab"
            >
              <cv-builder-tab-work-experience
                ref="cvBuilderTabWorkExperience"
              ></cv-builder-tab-work-experience>
            </tab-content>

            <!-- Step 3 -->
            <tab-content
              title="Education"
              icon="feather icon-book-open"
              :before-change="processEducationTab"
            >
              <cv-builder-tab-education
                ref="cvBuilderTabEducation"
              ></cv-builder-tab-education>
            </tab-content>

            <!-- Step 4  -->
            <tab-content
              title="Other Information"
              icon="feather icon-hard-drive"
              :before-change="processOtherInformationTab"
            >
              <cv-builder-tab-other-information
                ref="cvBuilderTabOtherInformation"
              ></cv-builder-tab-other-information>
            </tab-content>

            <!-- Step 5  -->
            <tab-content title="References" icon="feather icon-external-link">
              <cv-builder-tab-reference
                ref="cvBuilderTabReference"
              ></cv-builder-tab-reference>
            </tab-content>
          </form-wizard>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400;1,700&display=swap");
body {
  font-family: "Karla", sans-serif;
}
.register-left {
  background-color: $white-color;
}
form {
  label {
    color: #000000 !important;
  }
}
@media (max-width: 768px) {
  .stepTitle {
    display: none;
  }
}
.float {
  position: absolute;
  z-index: 1;
  width: 40px;
  height: 40px;
  bottom: 40px;
  right: 40px;
  font-size: 30px;
  margin-top: 10px;
  top: 0px;
  color: #0040a1;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
}
@media only screen and (max-width: 1000px) {
  h2 {
    font-size: 12px;
  }
  h6 {
    font-size: 8px;
  }
}
.select2 {
  width: 100% !important;
  font-weight: 350;
  font-size: 16px !important;
}
.select2-selection--single {
  padding-left: 12px !important;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
  border-radius: 5px !important;
  &:focus {
    border: 0.2px solid #154974a1;
  }
}
.select2-container--default {
  // background-color: red !important;
}
.select2-container .select2-selection--single {
  height: 100% !important;
}
.select2-selection__arrow {
  height: 50px !important;
}
.custom-input {
  padding: 25px;
  font-weight: 400;
}
.custom-input {
  padding: 25px;
  font-weight: 400;
}
.form-info {
  ul {
    list-style: none;
    li {
      .form-info-content {
        span {
          color: $main-color;
        }
      }
    }
  }
  .form-info-icons {
    i {
      font-size: 15px;
    }
  }
}
.wizard-tab-content {
  margin-top: 40px;
  margin-bottom: 50px;
  padding: 0px !important;
}
@media only screen and (max-width: 800px) {
  .wizard-btn {
    min-width: 80px !important;
  }
}
// .wizard-navigation {
//   width: 100%;
//   overflow: hidden;
//   position: relative;
// }
// .wizard-nav-pills {
//   width: 1200px;
//   overflow-x: scroll;
//   overflow-x: hidden;
// }
</style>

<script>
import vuescroll from "vuescroll";
import { mapState } from "vuex";
import myMixins from "../../../mixins/myMixins.js";

const CvPreviewer = () =>
  import(/* webpackChunkName: "cv-previewer" */ "./CvPreviewer.vue");
const CvBuilderTabProfile = () =>
  import(
    /* webpackChunkName: "cv-builder-tab-profile" */ "./CvBuilderTabProfile.vue"
  );
const CvBuilderTabWorkExperience = () =>
  import(
    /* webpackChunkName: "cv-builder-tab-work-experience" */ "./CvBuilderTabWorkExperience.vue"
  );
const CvBuilderTabEducation = () =>
  import(
    /* webpackChunkName: "cv-builder-tab-education" */ "./CvBuilderTabEducation.vue"
  );
const CvBuilderTabOtherInformation = () =>
  import(
    /* webpackChunkName: "cv-builder-tab-other-information" */ "./CvBuilderTabOtherInformation.vue"
  );
const CvBuilderTabReference = () =>
  import(
    /* webpackChunkName: "cv-builder-tab-reference" */ "./CvBuilderTabReference.vue"
  );

export default {
  components: {
    CvPreviewer,
    CvBuilderTabProfile,
    CvBuilderTabWorkExperience,
    CvBuilderTabEducation,
    CvBuilderTabOtherInformation,
    CvBuilderTabReference,
    vuescroll
  },

  mixins: [myMixins],

  data() {
    return {
      vuescrollOps: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        date: null,
        bar: {
          onlyShowBarOnScroll: false,
          size: "8px"
        }
      },
      formWizardActiveTab: 0
    };
  },

  computed: {
    ...mapState("cvWorkExperiences", {
      cvWorkExperiencesDataSet: state => state.dataSet
    }),
    ...mapState("cvEducations", {
      cvEducationsDataSet: state => state.dataSet
    }),
    ...mapState("cvCertifications", {
      cvCertificationsDataSet: state => state.dataSet
    }),
    ...mapState("cvSkills", {
      cvSkillsDataSet: state => state.dataSet
    }),
    ...mapState("cvHobbies", {
      cvHobbiesDataSet: state => state.dataSet
    }),
    ...mapState("cvAwards", {
      cvAwardsDataSet: state => state.dataSet
    }),
    ...mapState("cvLanguages", {
      cvLanguagesDataSet: state => state.dataSet
    }),
    ...mapState("cvReferences", {
      cvReferencesDataSet: state => state.dataSet
    })
  },

  watch: {
    formWizardActiveTab: function(newValue, oldValue) {
      if (newValue < oldValue) {
        this.$scrollTo("#cvBuilder-scroll-to-top");
      }
    },
    // eslint-disable-next-line
    cvWorkExperiencesDataSet: function(newValue, oldValue) {
      this.loadCvData(); // reload cv data
    },
    // eslint-disable-next-line
    cvEducationsDataSet: function(newValue, oldValue) {
      this.loadCvData(); // reload cv data
    },
    // eslint-disable-next-line
    cvCertificationsDataSet: function(newValue, oldValue) {
      this.loadCvData(); // reload cv data
    },
    // eslint-disable-next-line
    cvSkillsDataSet: function(newValue, oldValue) {
      this.loadCvData(); // reload cv data
    },
    // eslint-disable-next-line
    cvHobbiesDataSet: function(newValue, oldValue) {
      this.loadCvData(); // reload cv data
    },
    // eslint-disable-next-line
    cvAwardsDataSet: function(newValue, oldValue) {
      this.loadCvData(); // reload cv data
    },
    // eslint-disable-next-line
    cvLanguagesDataSet: function(newValue, oldValue) {
      this.loadCvData(); // reload cv data
    },
    // eslint-disable-next-line
    cvReferencesDataSet: function(newValue, oldValue) {
      this.loadCvData(); // reload cv data
    }
  },

  created() {
    // this.initializeCvBuilder();
  },

  beforeRouteLeave(to, from, next) {
    // const answer = window.confirm(
    //   "Do you really want to leave? you have unsaved changes!"
    // );
    // if (answer) {
    //   next();
    // } else {
    //   next(false);
    // }
    next();
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initializeCvBuilder()
        .then(() => {
          // Initialized successfully, do nothing, just load page
        })
        .catch(() => {
          vm.$router.push({ name: "dashboard" });
        });
    });
  },

  methods: {
    initializeCvBuilder() {
      return new Promise((resolve, reject) => {
        let loader = this.$loading.show({}); // vue-loading-overlay option
        this.$store
          .dispatch("cvs/create", {
            user_id: this.$store.state.auth.user.id
          })
          .then(() => {
            if (
              this.$store.state.cvs.success !== false &&
              this.$store.state.cvs.error === false
            ) {
              this.$store.commit("cvs/REMOVE_ERROR_SUCCESS");
              resolve(true);
            } else {
              reject(true);
            }
            loader.hide(); // vue-loading-overlay instance method
          });
      });
    },

    loadCvData(show_loader = false) {
      if (this.$store.state.cvs.loading !== true) {
        let loader = null;
        if (show_loader) {
          loader = this.$loading.show({}); // vue-loading-overlay option
        }
        this.$store
          .dispatch("cvs/view", this.$store.state.cvs.data.id)
          .then(() => {
            if (
              this.$store.state.cvs.success !== false &&
              this.$store.state.cvs.error === false
            ) {
              this.$store.commit("cvs/REMOVE_ERROR_SUCCESS");
              if (show_loader) {
                loader.hide(); // vue-loading-overlay instance method
              }
            }
          });
      }
    }, // loadCvData()

    alertCloseFormErrorBeforeNext() {
      let errMsg =
        "You're currently editing a form, please close the form before proceeding.";
      this.$swal.fire({
        toast: true,
        type: "error",
        title: "Attention!",
        text: errMsg,
        showConfirmButton: false,
        position: "top-end", // bottom-start | top | top-end | center
        background: "#f8d7da", // success:#d4edda | error:#f8d7da | warning:#f9edbe
        timer: 5000
      });
    },

    async processProfileTab() {
      let pPhoto = this.$refs.cvBuilderTabProfile.$refs.cvBuilderContentProfile
        .data.photo;
      if (!pPhoto) {
        let errMsg = "Please upload a headshot photograph.";
        this.$swal.fire({
          toast: true,
          type: "error",
          title: "Attention!",
          text: errMsg,
          showConfirmButton: false,
          position: "top-end", // bottom-start | top | top-end | center
          background: "#f8d7da", // success:#d4edda | error:#f8d7da | warning:#f9edbe
          timer: 5000
        });
        return false;
      }
      let resp = await this.$refs.cvBuilderTabProfile.$refs.cvBuilderContentProfile.$refs.form
        .validate()
        .then(success => {
          if (!success) {
            return false;
          }
          return this.$refs.cvBuilderTabProfile.$refs.cvBuilderContentProfile.updateProfile();
        });
      if (resp) {
        this.$scrollTo("#cvBuilder-scroll-to-top");
        return true;
      } else {
        return false;
      }
    },

    processWorkExperienceTab() {
      let formShow = this.$refs.cvBuilderTabWorkExperience.$refs
        .cvBuilderContentWorkExperience.form.show;
      let dataSetTotal = this.$refs.cvBuilderTabWorkExperience.$refs
        .cvBuilderContentWorkExperience.dataSetTotal;
      if (formShow === true || dataSetTotal <= 0) {
        let errMsg = null;
        if (formShow === true) {
          this.alertCloseFormErrorBeforeNext();
        } else {
          errMsg = "Please add at least one work experience.";
          this.$swal.fire({
            toast: true,
            type: "error",
            title: "Attention!",
            text: errMsg,
            showConfirmButton: false,
            position: "top-end", // bottom-start | top | top-end | center
            background: "#f8d7da", // success:#d4edda | error:#f8d7da | warning:#f9edbe
            timer: 5000
          });
        }
        return false;
      }
      this.$scrollTo("#cvBuilder-scroll-to-top");
      return true;
    },

    processEducationTab() {
      // validate education content
      let formShow = this.$refs.cvBuilderTabEducation.$refs
        .cvBuilderContentEducation.form.show;
      let dataSetTotal = this.$refs.cvBuilderTabEducation.$refs
        .cvBuilderContentEducation.dataSetTotal;
      if (formShow === true || dataSetTotal <= 0) {
        let errMsg = null;
        if (formShow === true) {
          this.alertCloseFormErrorBeforeNext();
        } else {
          errMsg = "Please add at least one education history.";
          this.$swal.fire({
            toast: true,
            type: "error",
            title: "Attention!",
            text: errMsg,
            showConfirmButton: false,
            position: "top-end", // bottom-start | top | top-end | center
            background: "#f8d7da", // success:#d4edda | error:#f8d7da | warning:#f9edbe
            timer: 5000
          });
        }
        return false;
      }
      // validate certificate content
      formShow = this.$refs.cvBuilderTabEducation.$refs
        .cvBuilderContentCertification.form.show;
      if (formShow === true) {
        this.alertCloseFormErrorBeforeNext();
        return false;
      }
      this.$scrollTo("#cvBuilder-scroll-to-top");
      return true;
    },

    processOtherInformationTab() {
      // validate Skill content
      let formShow = this.$refs.cvBuilderTabOtherInformation.$refs
        .cvBuilderContentSkill.form.show;
      if (formShow === true) {
        this.alertCloseFormErrorBeforeNext();
        return false;
      }
      // validate award content
      formShow = this.$refs.cvBuilderTabOtherInformation.$refs
        .cvBuilderContentAward.form.show;
      if (formShow === true) {
        this.alertCloseFormErrorBeforeNext();
        return false;
      }
      // validate hobby content
      formShow = this.$refs.cvBuilderTabOtherInformation.$refs
        .cvBuilderContentHobby.form.show;
      if (formShow === true) {
        this.alertCloseFormErrorBeforeNext();
        return false;
      }
      // validate language content
      formShow = this.$refs.cvBuilderTabOtherInformation.$refs
        .cvBuilderContentLanguage.form.show;
      if (formShow === true) {
        this.alertCloseFormErrorBeforeNext();
        return false;
      }
      this.$scrollTo("#cvBuilder-scroll-to-top");
      return true;
    },

    onComplete: function() {
      let vm = this;
      this.$swal
        .fire({
          type: "warning",
          title: `Finish CV?`,
          text:
            "We're sending your CV to over 10,000 employers. Click Yes to proceed.",
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
              .dispatch("cvs/publish", this.$store.state.cvs.data.id)
              .then(() => {
                if (
                  this.$store.state.cvs.success !== false &&
                  this.$store.state.cvs.error === false
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
              let msg = this.$store.state.cvs.success;
              this.$store.commit("cvs/REMOVE_ERROR_SUCCESS");
              this.$swal.fire("", msg, "success").then(function() {
                vm.$router.push({ name: "dashboard" });
              });
            } else {
              let msg = this.$store.state.cvs.error;
              this.$store.commit("cvs/REMOVE_ERROR_SUCCESS");
              this.$swal.fire("", msg, "error");
            }
          }
        }); // this.$swal.fire({...}).then({...})
    },

    importLinkedIn() {
      let vm = this;
      if (this.$store.state.cvs.data.import_linkedin_url) {
        let url = this.$store.state.cvs.data.import_linkedin_url;
        let newWindow = this.$_openNewWindowCenter(
          url,
          "Import LinkedIn Profile",
          600,
          600
        );
        //
        let timer = setInterval(function() {
          if (newWindow.closed) {
            clearInterval(timer);
            vm.loadCvData(true); // reload cv data
          }
        }, 1000);
      }
    },

    myChangeEvent(val) {
      console.log(val);
    },

    mySelectEvent({ id, text }) {
      console.log({ id, text });
    }
  }
};
</script>
