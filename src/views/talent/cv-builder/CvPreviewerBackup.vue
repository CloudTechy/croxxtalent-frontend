<template>
  <div>
    <!-- CV Preview Output -->
    <b-container>
      <b-overlay
        :show="cvPreviewLoading"
        spinner-variant="secondary"
        spinner-type="grow"
        spinner-small
        rounded="sm"
        style=""
        bg-color="#D0D9E4"
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
        <img
          v-if="cvPreviewOutput"
          :src="cvPreviewOutput"
          class="img-fluid rounded"
          style="max-height: 800px;"
        />
        <b-aspect v-if="!cvPreviewOutput" aspect="4:3"></b-aspect>
      </b-overlay>
    </b-container>
    <vue-html2pdf
      ref="html2Pdf"
      :show-layout="false"
      :enable-download="false"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="cvpreview"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      @progress="pdfOnProgress($event)"
      @hasStartedGeneration="pdfHasStartedGeneration()"
      @hasGenerated="pdfHasGenerated($event)"
    >
      <section id="cv-pdf-content" slot="pdf-content">
        <!-- PDF Content Here -->
        {{ cvPreviewSource }}
      </section>
    </vue-html2pdf>
    <!-- CV Preview Source -->
    <div style="opacity: 1.0; max-height: 0px; overflow: hidden;">
      <!-- eslint-disable-next-line -->
      <b-container id="cv-preview-source" ref="cvPreviewer" class="cv-container">
        <b-row no-gutters class="cv-cover">
          <b-col cols="3" class="cv-left">
            <b-row class="profile-image">
              <b-avatar
                :text="cvData.profile.name_initials"
                :src="cvData.profile.photo_url"
                variant="secondary"
                size="10rem"
                class="cursor-pointer shadow-md block"
              ></b-avatar>
            </b-row>
            <div class="contact">
              <div class="row">
                <p v-if="cvData.profile.email" class="text-left">
                  <i class="bx bx-mail-send"></i>
                  <br />
                  {{ cvData.profile.email }}
                </p>
                <p v-if="cvData.profile.phone" class="text-left">
                  <i class="bx bxs-phone"></i>
                  <br />
                  {{ cvData.profile.phone }}
                </p>
                <p
                  v-if="
                    cvData.profile.city ||
                      cvData.profile.state ||
                      cvData.profile.country
                  "
                  class="text-left"
                >
                  <i class="bx bxs-map-pin"></i>
                  <br />
                  {{ cvData.profile.city }}, {{ cvData.profile.state }},
                  {{ cvData.profile.country }}
                </p>
              </div>
            </div>
            <div class="interests">
              <div class="row">
                <h4>INTEREST</h4>
              </div>
              <div class="row">
                <ul>
                  <li>
                    <vs-chip class="ml-auto mr-4 bg-success">Games</vs-chip>
                  </li>
                  <li>
                    <vs-chip class="ml-auto mr-4 bg-success">Books</vs-chip>
                  </li>
                  <li>
                    <vs-chip class="ml-auto mr-4 bg-success"
                      >Problem Solving</vs-chip
                    >
                  </li>
                  <li>
                    <vs-chip class="ml-auto mr-4 bg-success">Machines</vs-chip>
                  </li>
                  <li>
                    <vs-chip class="ml-auto mr-4 bg-success"
                      >Physical activities</vs-chip
                    >
                  </li>
                  <li>
                    <vs-chip class="ml-auto mr-4 bg-success">Coffee</vs-chip>
                  </li>
                </ul>
              </div>
            </div>
            <div class="hobbies">
              <div class="row">
                <h4>HOBBIES</h4>
              </div>
              <div class="row">
                <ul class="text-left">
                  <li>
                    <vs-chip class="ml-auto mr-4 bg-success"
                      >Online Games</vs-chip
                    >
                  </li>
                  <li>
                    <vs-chip class="ml-auto mr-4 bg-success">Singing</vs-chip>
                  </li>
                  <li>
                    <vs-chip class="ml-auto mr-4 bg-success"
                      >Problem Solving</vs-chip
                    >
                  </li>
                  <li>
                    <vs-chip class="ml-auto mr-4 bg-success">Dancing</vs-chip>
                  </li>
                  <li>
                    <vs-chip class="ml-auto mr-4 bg-success"
                      >Physical activities</vs-chip
                    >
                  </li>
                  <li>
                    <vs-chip class="ml-auto mr-4 bg-success">Coffee</vs-chip>
                  </li>
                </ul>
              </div>
            </div>
          </b-col>
          <b-col cols="9" class="cv-preview-right">
            <div class="contact-info">
              <div class="row">
                <h1 class="text-uppercase">
                  {{ cvData.profile.first_name }}
                  {{ cvData.profile.last_name }}
                </h1>
              </div>
              <div class="row job-title">
                <div class="col-4">
                  <h6>WEB DEVELOPER</h6>
                </div>
                <div class="col-8">
                  <div class="underline"></div>
                </div>
              </div>
            </div>
            <div class="career">
              <div class="row">
                <h4>CAREER SUMMARY</h4>
              </div>
              <div class="row">
                <p class="text-left">
                  {{ cvData.profile.career_summary }}
                </p>
              </div>
            </div>
            <div v-if="cvData.workExperiences != {}" class="career">
              <div class="row">
                <h4>WORK EXPERIENCE</h4>
              </div>
              <div class="row text-left">
                <ul>
                  <li
                    v-for="(workExperience, index) in cvData.workExperiences"
                    :key="index"
                    class="mb-2"
                  >
                    <strong>
                      {{ workExperience.job_title }} at
                      {{ workExperience.employer }},
                      {{ workExperience.city }}
                    </strong>
                    <br />
                    {{ workExperience.start_date | moment("MMM YYYY") }}
                    &#8212;
                    <span v-if="!workExperience.is_current">
                      {{ workExperience.end_date | moment("MMM YYYY") }}
                    </span>
                    <span v-else>Present</span>
                    <span v-if="workExperience.description">
                      <br />
                      {{ workExperience.description }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="career">
              <div class="row">
                <h4>CAREER OBJECTIVES</h4>
              </div>
              <div class="row text-left">
                <P>
                  A resume objective is a statement of your career goals, work
                  experience, and talents. The purpose of this short
                  introduction is to show what makes you the ideal candidate for
                  the position. A resume objective is usually two or three
                  sentences long. It's appropriate if you're changing careers or
                  just starting. A resume objective is a statement of your
                  career goals, work experience, and talents. The purpose of
                  introduction is to show what makes you the ideal candidate for
                  the position. A resume objective is usually two or three
                  sentences long. It's appropriate if you're changing careers or
                  just starting.
                </P>
              </div>
            </div>
            <div class="career">
              <div class="row">
                <div class="col">
                  <div class="row">
                    <h4>CAREER DATA</h4>
                  </div>
                  <ul class=" text-left">
                    <li>Online Games</li>
                    <li>Singing</li>
                    <li>Problem Solving</li>
                    <li>Dancing</li>
                    <li>Physical activities</li>
                    <li>Coffee</li>
                  </ul>
                </div>
                <div class="col">
                  <div class="row">
                    <h4>CAREER DATA</h4>
                  </div>
                  <div class="row text-left">
                    <P>
                      A resume objective is a statement of your career goals,
                      work experience, and talents. The purpose of this short
                      introduction is to show what makes you the ideal candidate
                      the position. A resume objective is usually two or three
                      sentences long. It's appropriate if you're changing
                      careers just starting.
                    </P>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cv-container {
  padding: 0px !important;
  .cv-cover {
    margin: 0px auto;
    padding: 0px !important;
    .cv-left {
      margin: 0px auto;
      background-color: rgb(0, 42, 87);
      padding: 60px 30px 100px 30px;
      .profile-image {
        margin: auto;
        width: 100%;
        // height: 50%;
        border-radius: 100%;
        img {
          width: 100%;
        }
      }
      .about-me {
        margin-top: 25px;
        padding: 18px;
        h4 {
          color: $white-color;
          font-size: 16px;
          padding-bottom: 3px;
          border-bottom: 2px solid #ffffff;
        }
        p {
          color: $white-color;
          font-size: 12px;
          opacity: 0.7;
          font-weight: 100;
        }
      }
      .contact {
        margin-top: 50px;
        opacity: 0.7;
        h4 {
          color: $white-color;
          font-size: 18px;
          padding-bottom: 3px;
          border-bottom: 2px solid #ffffff;
        }
        p {
          color: $white-color;
          font-size: 12px;
          opacity: 0.7;
          font-weight: 100;
          i {
            opacity: 0.9;
            font-size: 20px;
          }
        }
      }
      .interests {
        margin-top: 20px;
        h4 {
          color: $white-color;
          font-size: 18px;
          padding-bottom: 3px;
          border-bottom: 2px solid #ffffff;
        }
        li {
          color: $white-color;
          font-size: 12px;
          opacity: 0.7;
          font-weight: 100;
          list-style: none;
          margin-right: 25px;
          .chip {
            color: red;
          }
        }
      }
      .hobbies {
        margin-top: 20px;
        h4 {
          color: $white-color;
          font-size: 18px;
          padding-bottom: 3px;
          border-bottom: 2px solid #ffffff;
        }
        li {
          color: $white-color;
          font-size: 12px;
          opacity: 0.7;
          font-weight: 100;
          list-style: none;
          margin-right: 25px;
        }
      }
      .material-icons {
        color: $white-color;
      }
    }
    .cv-preview-right {
      background-color: rgb(255, 255, 255);
      margin: 0px;
      padding: 40px 30px 80px 30px;
      .contact-info {
        h1 {
          font-size: 35px;
          font-weight: 300;
          letter-spacing: 5px;
        }
      }
      h4 {
        // margin-left: 10px;
      }
      .underline {
        border-bottom: 8px solid $secondary-color;
        width: 90%;
        margin-top: 5px;
      }
      .job-title {
        width: 100%;
      }
      .career {
        margin-top: 40px;
        h4 {
          font-size: 18px;
          padding-bottom: 3px;
          border-bottom: 2px solid #000000; /* $secondary-color */
        }
        p {
          color: #000000;
          font-size: 13px;
          opacity: 0.7;
          font-weight: 400;
          width: 90%;
        }
      }
    }
  }
}
</style>
<script>
import { mapState } from "vuex";
// Import html2canvas
import html2canvas from "html2canvas";
import VueHtml2pdf from "vue-html2pdf";

export default {
  components: {
    VueHtml2pdf
  },

  data() {
    return {
      cvPreviewLoading: true,
      cvPreviewSource: null,
      cvPreviewOutput: null,
      cvData: {
        profile: {
          first_name: null,
          lastname: null,
          email: null,
          phone: null,
          address: null,
          city: null,
          state: null,
          country: null,
          postal_code: null,
          career_summary: null,
          photo_url: null,
          name_initials: this.$store.state.auth.user.name_initials
        },
        workExperiences: {}
      }
    };
  },

  computed: {
    ...mapState("cvs", {
      cvsData: state => state.data
    })
  },

  watch: {
    // eslint-disable-next-line
    cvsData: function(newValue, oldValue) {
      if (newValue) {
        this.cvData.profile = {
          first_name: newValue.first_name,
          last_name: newValue.last_name,
          email: newValue.email,
          phone: newValue.phone,
          address: newValue.address,
          city: newValue.city,
          state: newValue.state_name,
          country: newValue.country_name,
          postal_code: newValue.postal_code,
          career_summary: newValue.career_summary,
          photo_url: newValue.photo_url,
          name_initials: newValue.photo_url ? null : newValue.name_initials
        };
        this.cvData.workExperiences = newValue.work_experiences;
        let vm = this;
        setTimeout(function() {
          vm.loadCvPreview();
        }, 1000);
      }
    }
  },

  methods: {
    async loadCvPreview() {
      let vm = this;
      let cvS = document.getElementById("cv-preview-source").innerHTML;
      document.getElementById("cv-pdf-content").innerHTML = cvS;
      vm.$refs.html2Pdf.generatePdf();
      vm.cvPreviewLoading = true;
      const el = vm.$refs.cvPreviewer;
      const options = {
        backgroundColor: null
      };
      return await html2canvas(el, options).then(function(canvas) {
        // Canvas to Image Data URL
        // let url = canvas.toDataURL('image/webp');
        // Canvas to Image Blob
        canvas.toBlob(
          function(blob) {
            let url = URL.createObjectURL(blob);
            vm.cvPreviewOutput = url;
            vm.cvPreviewLoading = false;
          },
          "image/webp", // image/webp | image/jpg | default: image/png
          1.0 // 0 to 1 | default: 0.80 for image/jpeg and 0.92 for image/webp
        );
      });
    },

    pdfOnProgress() {
      // has $event param
    },

    pdfHasStartedGeneration() {
      //
    },

    pdfHasGenerated() {
      // has $event param
    }
  }
};
</script>
