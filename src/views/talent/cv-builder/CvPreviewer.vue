<template>
  <div>
    <!-- CV Preview Output -->
    <b-container style="">
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
          style="max-width: 100%;"
        />
        <div v-if="!cvPreviewOutput" style="width: 45vw; height: 80vh;"></div>
      </b-overlay>
    </b-container>
    <!-- CV Preview Source -->
    <div style="opacity:0; max-height: 0px; max-width:0px; overflow:hidden;">
      <b-container ref="cvPreviewer" class="cv-container" style="width: 850px;">
        <b-row no-gutters class="cv-cover">
          <b-col cols="3" class="cv-left">
            <b-row v-if="cvData.profile.photo_url" class="profile-image">
              <b-avatar
                :text="cvData.profile.name_initials"
                :src="cvData.profile.photo_url"
                variant="secondary"
                size="10rem"
                class="shadow-md block"
              ></b-avatar>
              <!-- <img
                :src="cvData.profile.photo_url"
                class="img-fluid rounded-circle mx-auto d-block"
                style="width: 10rem; max-height: 10rem;"
                crossOrigin="*"
                alt=""
              /> -->
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
            <div v-if="cvData.skills.length" class="skills">
              <div class="row">
                <h4>SKILLS</h4>
              </div>
              <div class="row">
                <ul class="text-left">
                  <li v-for="(skill, index) in cvData.skills" :key="index">
                    <p>
                      <vs-chip class="ml-auto mr-4 bg-success">
                        {{ skill.skill_name }}
                      </vs-chip>
                      <br />
                      <br />
                      <!-- rating -->
                      <star-rating
                        v-if="skill.level === 'basic'"
                        inactive-color="#e5e6e738"
                        active-color="#ffffff"
                        :rating="1"
                        :max-rating="3"
                        :star-size="20"
                        :show-rating="false"
                        :read-only="true"
                      ></star-rating>
                      <star-rating
                        v-if="skill.level === 'intermediate'"
                        inactive-color="#e5e6e738"
                        active-color="#ffffff"
                        :rating="2"
                        :max-rating="3"
                        :star-size="20"
                        :show-rating="false"
                        :read-only="true"
                      ></star-rating>
                      <star-rating
                        v-if="skill.level === 'advanced'"
                        inactive-color="#e5e6e738"
                        active-color="#ffffff"
                        :rating="3"
                        :max-rating="3"
                        :star-size="20"
                        :show-rating="false"
                        :read-only="true"
                      ></star-rating>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="cvData.hobbies.length" class="hobbies">
              <div class="row">
                <h4>HOBBIES</h4>
              </div>
              <div class="row">
                <ul class="text-left">
                  <li v-for="(hobby, index) in cvData.hobbies" :key="index">
                    <vs-chip class="ml-auto mr-4 bg-success">
                      {{ hobby.name }}
                    </vs-chip>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="cvData.languages.length" class="hobbies">
              <div class="row">
                <h4>LANGUAGES</h4>
              </div>
              <div class="row">
                <ul class="text-left">
                  <li
                    v-for="(language, index) in cvData.languages"
                    :key="index"
                  >
                    <p>
                      <vs-chip class="ml-auto mr-4 bg-success">
                        {{ language.language_name }}
                      </vs-chip>
                      <br />
                      <br />

                      <!-- rating -->
                      <star-rating
                        v-if="language.level === 'basic'"
                        inactive-color="#e5e6e738"
                        active-color="#ffffff"
                        :rating="1"
                        :max-rating="3"
                        :star-size="20"
                        :show-rating="false"
                        :read-only="true"
                      ></star-rating>
                      <star-rating
                        v-if="language.level === 'intermediate'"
                        inactive-color="#e5e6e738"
                        active-color="#ffffff"
                        :rating="2"
                        :max-rating="3"
                        :star-size="20"
                        :show-rating="false"
                        :read-only="true"
                      ></star-rating>
                      <star-rating
                        v-if="language.level === 'advanced'"
                        inactive-color="#e5e6e738"
                        active-color="#ffffff"
                        :rating="3"
                        :max-rating="3"
                        :star-size="20"
                        :show-rating="false"
                        :read-only="true"
                      ></star-rating>
                    </p>
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
              <div v-if="cvData.profile.job_title_name" class="row job-title">
                <div class="col-4">
                  <h6 class="text-uppercase">
                    {{ cvData.profile.job_title_name }}
                  </h6>
                </div>
                <div class="col-8">
                  <div class="underline"></div>
                </div>
              </div>
              <div v-else class="row job-title">
                <div class="col-12">
                  <div class="underline"></div>
                </div>
              </div>
            </div>
            <div v-if="cvData.profile.career_summary" class="career">
              <div class="row">
                <h4>CAREER SUMMARY</h4>
                <vs-divider color="primary" class="mt-0"></vs-divider>
              </div>
              <div class="row">
                <p class="text-left text-justify">
                  {{ cvData.profile.career_summary }}
                </p>
              </div>
            </div>
            <div
              v-if="cvData.workExperiences.length"
              class="career work-experience"
            >
              <div class="row">
                <h4>WORK EXPERIENCE</h4>
                <vs-divider color="primary" class="mt-0"></vs-divider>
              </div>
              <div class="row text-left">
                <ul>
                  <div class="row">
                    <div class="col"></div>
                  </div>
                  <li
                    v-for="(workExperience, index) in cvData.workExperiences"
                    :key="index"
                    class="mb-2"
                  >
                    <strong>
                      {{ workExperience.job_title_name }} at
                      {{ workExperience.employer }},
                      {{ workExperience.city }}
                    </strong>
                    <i class="float-right mr-5 text-success">
                      {{ workExperience.start_date | moment("MMM YYYY") }}
                      &#8212;
                      <span v-if="!workExperience.is_current">
                        {{ workExperience.end_date | moment("MMM YYYY") }}
                      </span>
                      <span v-else>Present</span>
                    </i>
                    <p v-if="workExperience.description" class="pt-4">
                      {{ workExperience.description }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="cvData.educations.length" class="career">
              <div class="row">
                <h4>EDUCATION</h4>
                <vs-divider color="primary" class="mt-0"></vs-divider>
              </div>
              <div class="row text-left">
                <ul>
                  <li
                    v-for="(education, index) in cvData.educations"
                    :key="index"
                    class="mb-2"
                  >
                    <strong>
                      {{ education.degree_name }}
                      {{ education.course_of_study_name }},
                      {{ education.school }}, {{ education.city }}
                    </strong>
                    <br />
                    <i>
                      {{ education.start_date | moment("MMM YYYY") }}
                      &#8212;
                      <span v-if="!education.is_current">
                        {{ education.end_date | moment("MMM YYYY") }}
                      </span>
                      <span v-else>Present</span>
                    </i>
                    <p v-if="education.description">
                      {{ education.description }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="cvData.certifications.length" class="career">
              <div class="row">
                <h4>CERTIFICATIONS</h4>
                <vs-divider color="primary" class="mt-0"></vs-divider>
              </div>
              <div class="row text-left">
                <ul>
                  <li
                    v-for="(certification, index) in cvData.certifications"
                    :key="index"
                    class="mb-2"
                  >
                    <strong>
                      {{ certification.certification_course_name }} at
                      {{ certification.institution }}
                    </strong>
                    <br />
                    <i>
                      {{ certification.start_date | moment("MMM YYYY") }}
                      &#8212;
                      <span v-if="!certification.is_current">
                        {{ certification.end_date | moment("MMM YYYY") }}
                      </span>
                      <span v-else>Present</span>
                    </i>
                    <p v-if="certification.description">
                      {{ certification.description }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="cvData.awards.length" class="career">
              <div class="row">
                <h4>HONOURS & AWARDS</h4>
                <vs-divider color="primary" class="mt-0"></vs-divider>
              </div>
              <div class="row text-left">
                <ul>
                  <li
                    v-for="(award, index) in cvData.awards"
                    :key="index"
                    class="mb-2"
                  >
                    <strong>{{ award.title }}</strong>
                    <br />
                    {{ award.date | moment("MMM YYYY") }}
                    &middot;
                    {{ award.organization }}
                    <p v-if="award.description">
                      {{ award.description }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="career">
              <div class="row">
                <h4>REFERENCES</h4>
                <vs-divider color="primary" class="mt-0"></vs-divider>
              </div>
              <div v-if="cvData.references.length" class="row text-left">
                <ul>
                  <li
                    v-for="(reference, index) in cvData.references"
                    :key="index"
                    class="mb-3"
                  >
                    <strong>{{ reference.name }}</strong>
                    <br />
                    {{ reference.position }}, {{ reference.company }}
                    <br />
                    {{ reference.email }}
                    <br />
                    {{ reference.phone }}
                  </li>
                </ul>
              </div>
              <div v-else>References available upon request.</div>
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
      background-color: $primary-color;
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
      .skills {
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
      padding: 40px 60px 80px 30px;
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
          color: $primary-color; /* $secondary-color */
        }
        p {
          color: #000000;
          font-size: 13px;
          opacity: 0.7;
          font-weight: 400;
          width: 90%;
          text-align: justify;
        }
      }
      .work-experience {
        ul {
          li {
          }
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
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating
  },
  data() {
    return {
      cvPreviewLoading: true,
      cvPreviewOutput: null,
      cvData: {
        profile: {
          job_title_id: null,
          first_name: null,
          lastname: null,
          gender: null,
          date_of_birth: null,
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
        workExperiences: [],
        educations: [],
        certifications: [],
        skills: [],
        hobbies: [],
        awards: [],
        languages: [],
        references: []
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
          job_title_id: newValue.job_title_id,
          first_name: newValue.first_name,
          last_name: newValue.last_name,
          gender: newValue.gender,
          date_of_birth: newValue.date_of_birth,
          email: newValue.email,
          phone: newValue.phone,
          address: newValue.address,
          city: newValue.city,
          state: newValue.state_name,
          country: newValue.country_name,
          postal_code: newValue.postal_code,
          career_summary: newValue.career_summary,
          photo_url: newValue.photo_data_url, // newValue.photo_url | newValue.photo_url_cors
          name_initials: newValue.photo_url ? null : newValue.name_initials
        };
        this.cvData.workExperiences = newValue.work_experiences;
        this.cvData.educations = newValue.educations;
        this.cvData.certifications = newValue.certifications;
        this.cvData.skills = newValue.skills;
        this.cvData.hobbies = newValue.hobbies;
        this.cvData.awards = newValue.awards;
        this.cvData.languages = newValue.languages;
        this.cvData.references = newValue.references;
        let vm = this;
        if (newValue.phone) {
          setTimeout(function() {
            vm.loadCvPreview();
          }, 1000);
        }
      }
    }
  },

  methods: {
    async loadCvPreview() {
      let vm = this;
      vm.cvPreviewLoading = true;
      const el = vm.$refs.cvPreviewer;
      const options = {
        backgroundColor: null,
        scrollX: 0,
        scrollY: 0, // scrollY: -window.scrollY,
        allowTaint: true,
        useCORS: true,
        proxy: [],
        imageTimeout: 0, // 15000
        logging: false
      };
      return await html2canvas(el, options).then(function(canvas) {
        // Canvas to Image Data URL
        // let url = canvas.toDataURL("image/webp", 1.0);
        // vm.cvPreviewOutput = url;
        // vm.cvPreviewLoading = false;

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
    }
  }
};
</script>
