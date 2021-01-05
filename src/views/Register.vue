<template>
  <layout-auth style="height:100%;">
    <b-container fluid class="register-layout">
      <div class="particle">
        <!-- eslint-disable -->
            <vue-particles
              color="#dedede"
              :particleOpacity="0.7"
              :particlesNumber="80"
              shapeType="circle"
              :particleSize="4"
              linesColor="#dedede"
              :linesWidth="1"
              :lineLinked="true"
              :lineOpacity="0.4"
              :linesDistance="150"
              :moveSpeed="3"
              :hoverEffect="true"
              hoverMode="grab"
              :clickEffect="true"
              clickMode="push"
            >
            </vue-particles>
            <!-- eslint-enable -->
      </div>
      <b-row class="register-container">
        <b-col order="5" md class="register-right">
          <div class="register-content card-title text-center">
            <b-row>
              <b-col class="col-fullwidth">
                <h1>Have an account already?</h1>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="col-fullwidth">
                <p>
                  Get hired by top oil companies around the world with just a
                  simple click and create your own Cv with just few steps.
                </p>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="col-fullwidth">
                <!-- eslint-disable-next-line -->
                <router-link :to="{ name: 'login' }" tag="a" class="btn btn-lg button-link">Sign In</router-link>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col order="1" md class="register-left">
          <b-row class="register-logo ml-6">
            <a href="/dashboard">
              <img
                alt="Croxx Talent"
                src="@/assets/images/logo.png"
                width="300"
                class="float-left"
              />
            </a>
          </b-row>
          <b-row class="text-center">
            <b-col fluid>
              <h1>
                Create Account
              </h1>
            </b-col>
            <div class="w-100"></div>
            <b-col>
              <p>
                Fill the below form to create a new account.
              </p>
            </b-col>
          </b-row>

          <div class="w-100"></div>
          <div v-if="formCurrentStep === 1" class="row center social-auth">
            <div class="col social-list">
              <img src="@/assets/images/icons/linkedin.png" alt="" width="45" />
              <img
                class="ml-6 mr-6"
                src="@/assets/images/icons/google-icon.png"
                alt=""
                width="45"
              />
              <img src="@/assets/images/icons/mail.png" alt="" width="45" />
            </div>
          </div>

          <b-row class="justify-content-md-center">
            <b-col col lg="8">
              <p v-if="regError">
                <b-alert variant="danger" show>
                  {{ regError }}
                  <!-- eslint-disable-next-line -->
                  <ul v-for="(item, index) in validationErrors" :key="index" class="ml-6" style="list-style-type:disc">
                    <li>{{ item[0] }}</li>
                  </ul>
                </b-alert>
              </p>
              <p v-if="regSuccess">
                <!-- eslint-disable-next-line -->
                <b-alert variant="success" show>{{ regSuccess }}</b-alert>
              </p>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <validation-observer
                ref="form"
                v-slot="{ invalid, handleSubmit }"
              >
                <form @submit.prevent="handleSubmit(register)">
                  <fieldset v-if="formCurrentStep === 1">
                    <b-row>
                      <b-col md="6">
                        <div class="center content-inputs">
                          <keep-alive>
                            <validation-provider
                              v-slot="validationContext"
                              vid="first_name"
                              name="First Name"
                              rules="required|max:30"
                            >
                              <vs-input
                                v-model.trim="form.first_name"
                                type="text"
                                class="w-full"
                                size="large"
                                label-placeholder="First Name"
                                maxlength="30"
                                :class="{
                                  'is-invalid': validationContext.errors[0]
                                }"
                              >
                              </vs-input>
                              <div class="invalid-feedback">
                                {{ validationContext.errors[0] }}
                              </div>
                            </validation-provider>
                          </keep-alive>
                        </div>
                      </b-col>
                      <b-col md="6">
                        <div class="center content-inputs">
                          <validation-provider
                            v-slot="validationContext"
                            vid="last_name"
                            name="Last Name"
                            rules="required|max:30"
                          >
                            <vs-input
                              v-model.trim="form.last_name"
                              type="text"
                              class=" w-full"
                              size="large"
                              label-placeholder="Last Name"
                              maxlength="30"
                              :class="{
                                'is-invalid': validationContext.errors[0]
                              }"
                            >
                            </vs-input>
                            <div class="invalid-feedback">
                              {{ validationContext.errors[0] }}
                            </div>
                          </validation-provider>
                        </div>
                      </b-col>
                    </b-row>
                    <div class="center content-inputs">
                      <keep-alive>
                        <validation-provider
                          v-slot="validationContext"
                          vid="email"
                          name="Email Address"
                          rules="required|email|max:150"
                        >
                          <vs-input
                            v-model.trim="form.email"
                            type="text"
                            class="w-full"
                            size="large"
                            label-placeholder="Email Address"
                            maxlength="150"
                            :class="{
                              'is-invalid': validationContext.errors[0]
                            }"
                          >
                          </vs-input>
                          <div class="invalid-feedback">
                            {{ validationContext.errors[0] }}
                          </div>
                        </validation-provider>
                      </keep-alive>
                    </div>
                    <div class="center content-inputs mb-6">
                      <validation-provider
                        v-slot="validationContext"
                        vid="password"
                        name="Password"
                        rules="required|min:6"
                      >
                        <vs-input
                          v-model.trim="form.password"
                          type="password"
                          class=" w-full"
                          size="large"
                          label-placeholder="Password"
                          :class="{
                            'is-invalid': validationContext.errors[0]
                          }"
                        >
                        </vs-input>
                        <div class="invalid-feedback">
                          {{ validationContext.errors[0] }}
                        </div>
                      </validation-provider>
                    </div>
                    <div class="center content-inputs">
                      <validation-provider
                        v-slot="validationContext"
                        vid="accept_terms"
                        name="Accept Terms"
                        :rules="{ required: { allowFalse: false } }"
                      >
                        <b-form-checkbox
                          v-model="form.accept_terms"
                          s
                          :value="true"
                          :unchecked-value="false"
                          size="lg"
                          class=""
                        >
                          I agree to the
                          <router-link :to="{ name: 'terms' }" tag="a">
                            terms & conditions
                          </router-link>
                        </b-form-checkbox>
                        <div class="invalid-feedback">
                          {{ validationContext.errors[0] }}
                        </div>
                      </validation-provider>
                    </div>
                  </fieldset>

                  <fieldset v-else-if="formCurrentStep === 2">
                    <h4 class="mt-5">Choose Account Type</h4>
                    <h6></h6>
                    <div class="center content-inputs mb-6">
                      <ul class="leftx">
                        <validation-provider
                          v-slot="validationContext"
                          vid="type"
                          name="Account Type"
                          rules="required"
                        >
                          <div class="frb frb-primary">
                            <input
                              id="account-type-talent"
                              v-model.trim="form.type"
                              type="radio"
                              name="account-type"
                              value="talent"
                              :class="{
                                'is-invalid': validationContext.errors[0]
                              }"
                            />
                            <label for="account-type-talent">
                              <span class="frb-title">Talent / Job Seeker</span>
                              <br />
                              <span class="frb-description"
                                >Looking for your dream job? Create a unique
                                career profile.</span
                              >
                            </label>
                          </div>
                          <div class="frb frb-primary">
                            <input
                              id="account-type-employer"
                              v-model.trim="form.type"
                              type="radio"
                              name="account-type"
                              value="employer"
                              :class="{
                                'is-invalid': validationContext.errors[0]
                              }"
                            />
                            <label for="account-type-employer">
                              <span class="frb-title">Employer</span><br />
                              <span class="frb-description"
                                >Looking for experienced and quality
                                candidates?</span
                              >
                            </label>
                          </div>
                          <div class="frb frb-primary">
                            <input
                              id="account-type-affiliate"
                              v-model.trim="form.type"
                              type="radio"
                              name="account-type"
                              value="affiliate"
                              :class="{
                                'is-invalid': validationContext.errors[0]
                              }"
                            />
                            <label for="account-type-affiliate">
                              <span class="frb-title"
                                >Affiliate / Referral</span
                              >
                              <br />
                              <span class="frb-description"
                                >Partner with us.</span
                              >
                            </label>
                          </div>
                          <div class="invalid-feedback">
                            {{ validationContext.errors[0] }}
                          </div>
                        </validation-provider>
                      </ul>
                    </div>
                  </fieldset>

                  <!-- Employer questions -->

                  <fieldset
                    v-else-if="
                      formCurrentStep === 3 && form.type === 'employer'
                    "
                  >
                    <h4 class="mt-4">
                      Provide the following questions to complete your
                      registration as an employer.
                    </h4>
                    <div class="center content-inputs mb-6">
                      <ul class="leftx">
                        <div class="">
                          <md-field>
                            <label for="">
                              <span class=""
                                >What's the name of your Organization?</span
                              >
                            </label>
                            <md-input
                              v-model="form.employer_org_name"
                              type="text"
                              md-counter="50"
                              required
                              maxlength="50"
                              class="border-0"
                            >
                            </md-input>
                          </md-field>
                        </div>
                        <div class="frb frb-primary">
                          <md-field>
                            <label for="">
                              <span class="">What are core services?</span>
                            </label>
                            <md-textarea
                              v-model="form.employer_org_core_services"
                              type="text"
                              md-autogrow
                              md-counter="500"
                              required
                              maxlength="500"
                              class="border-0"
                            >
                            </md-textarea>
                          </md-field>
                        </div>
                        <div class="frb frb-primary">
                          <md-field>
                            <label for="employer_org_size">
                              <span class=""
                                >What's the size of your organization?</span
                              >
                            </label>
                            <md-select
                              id="employer_org_size"
                              v-model="form.employer_org_size"
                              name="employer_org_size"
                              class="border-0"
                            >
                              <md-option value="1 - 10">1 - 10</md-option>
                              <md-option value="10 - 100">10 - 100</md-option>
                              <md-option value="100 - 1000"
                                >100 - 1000</md-option
                              >
                              <md-option value="1000 - 10000"
                                >1000 - 10000</md-option
                              >
                            </md-select>
                          </md-field>
                        </div>
                        <div class="frb frb-primary">
                          <div class="form-row">
                            <div class="form-group col">
                              <div class="input-group input-group-lg">
                                What are the locations of your organisation?
                              </div>
                            </div>
                            <div class="form-group col">
                              <div class="input-group input-group-lg">
                                <tags-input
                                  v-model="EmployerLocationTags"
                                  element-id="EmployerLocationTags"
                                  placeholder="Add a location"
                                  add-tags-on-space
                                  add-tags-on-comma
                                  :existing-tags="[
                                    {
                                      key: 'web-development',
                                      value: 'Nigeria'
                                    },
                                    { key: 'php', value: 'europe' },
                                    { key: 'javascript', value: 'Canada' }
                                  ]"
                                  :typeahead="true"
                                ></tags-input>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="frb frb-primary">
                          <div class="form-row">
                            <div class="form-group col">
                              <div class="input-group input-group-lg">
                                What's the contact details of someone we can
                                reach?
                              </div>
                            </div>
                            <div class="form-group col">
                              <div class="input-group input-group-lg">
                                <vue-tel-input
                                  v-model="form.employer_org_contact"
                                >
                                </vue-tel-input>
                              </div>
                            </div>
                          </div>
                          <!-- <md-field>
                            <label for="">
                              <span class=""
                                >What's the contact details of someone we can
                                reach?</span
                              >
                            </label>

                          </md-field> -->
                        </div>
                      </ul>
                    </div>
                  </fieldset>

                  <!-- Affiliate questions -->

                  <fieldset
                    v-else-if="
                      formCurrentStep === 3 && form.type === 'affiliate'
                    "
                  >
                    <h4 class="mt-4">
                      Provide the following questions to complete your
                      registration as an affiliate.
                    </h4>
                    <div class="center content-inputs mb-6">
                      <ul class="leftx">
                        <div class="">
                          <md-field>
                            <label for="">
                              <span class=""
                                >What's the name of your organization?</span
                              >
                            </label>
                            <md-input
                              v-model="form.employer_org_name"
                              type="text"
                              md-counter="50"
                              required
                              maxlength="50"
                              class="border-0"
                            >
                            </md-input>
                          </md-field>
                        </div>

                        <div class="frb frb-primary">
                          <div class="form-row">
                            <div class="form-group col">
                              <div class="input-group input-group-lg">
                                What's the contact details of someone we can
                                reach?
                              </div>
                            </div>
                            <div class="form-group col">
                              <div class="input-group input-group-lg">
                                <vue-tel-input
                                  v-model="form.employer_org_contact"
                                >
                                </vue-tel-input>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="frb frb-primary">
                          <div class="form-row">
                            <div class="form-group col">
                              <div class="input-group input-group-lg">
                                What are the locations of your organisation?
                              </div>
                            </div>
                            <div class="form-group col">
                              <div class="input-group input-group-lg">
                                <tags-input
                                  v-model="AffiliateLocationTags"
                                  element-id="AffiliateLocationTags"
                                  placeholder="Add a location"
                                  add-tags-on-space
                                  add-tags-on-comma
                                  :existing-tags="[
                                    {
                                      key: 'web-development',
                                      value: 'Nigeria'
                                    },
                                    { key: 'php', value: 'Europe' },
                                    { key: 'javascript', value: 'Canada' }
                                  ]"
                                  :typeahead="true"
                                ></tags-input>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="frb frb-primary">
                          <div class="form-row">
                            <div class="form-group col">
                              <div class="input-group input-group-lg">
                                Other organizations you have worked with?
                              </div>
                            </div>
                            <div class="form-group col">
                              <div class="input-group input-group-lg">
                                <tags-input
                                  v-model="AffiliateOrganisationTags"
                                  element-id="AffiliateOrganisationTags"
                                  placeholder="Add organisation"
                                  add-tags-on-space
                                  add-tags-on-comma
                                  :existing-tags="[
                                    {
                                      key: 'web-development',
                                      value: 'Facebook'
                                    },
                                    { key: 'php', value: 'IBM' },
                                    { key: 'javascript', value: 'Microsoft' }
                                  ]"
                                  :typeahead="true"
                                ></tags-input>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- <div class="frb frb-primary">
                          <md-field>
                            <label for="employer_org_size">
                              <span class=""
                                >Other organizations you have worked with?</span
                              >
                            </label>
                            <div class="form-group col">
                              <div class="input-group input-group-lg">
                                <tags-input
                                  v-model="selectedTags"
                                  element-id="tags"
                                  placeholder="Add organisation"
                                  add-tags-on-space
                                  add-tags-on-comma
                                  :existing-tags="[
                                    {
                                      key: 'web-development',
                                      value: 'Microsoft'
                                    },
                                    { key: 'php', value: 'IBM' },
                                    { key: 'javascript', value: 'Facebook' }
                                  ]"
                                  :typeahead="true"
                                ></tags-input>
                              </div>
                            </div>
                          </md-field>
                        </div> -->
                      </ul>
                    </div>
                  </fieldset>

                  <b-row
                    v-if="formCurrentStep === 3"
                    class="center content-inputs"
                  >
                    <b-col>
                      <!-- eslint-disable-next-line -->
                      <vs-button @click="formCurrentStep--" class="success auth-btn" size="meduim">Previous</vs-button>
                    </b-col>
                    <b-col>
                      <!-- eslint-disable-next-line -->
                      <vs-button :disabled="!form.type" class="primary auth-btn" button="submit" size="meduim" style="background-color:#0040a1 !important">Submit</vs-button>
                    </b-col>
                  </b-row>

                  <div
                    v-if="formCurrentStep === 1"
                    class="center content-inputs"
                  >
                    <!-- eslint-disable-next-line -->
                    <vs-button :disabled="!form.accept_terms" class="auth-btn" button="submit" size="meduim">Next</vs-button>
                  </div>
                  <b-row
                    v-if="formCurrentStep === 2"
                    class="center content-inputs"
                  >
                    <b-col>
                      <!-- eslint-disable-next-line -->
                      <vs-button @click="formCurrentStep--" class="success auth-btn" size="meduim">Previous</vs-button>
                    </b-col>
                    <b-col>
                      <!-- eslint-disable-next-line -->
                      <vs-button :disabled="!form.type" class="primary auth-btn" button="submit" size="meduim" style="background-color:#0040a1 !important">{{form.type == "employer" || form.type == "affiliate"  ? "Next" : "Submit"}}</vs-button>
                    </b-col>
                  </b-row>

                  <b-col class="text-center">
                    <p>
                      Already have an account?
                      <router-link :to="{ name: 'login' }" tag="a"
                        >Login</router-link
                      >
                    </p>
                  </b-col>
                </form>
              </validation-observer>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </layout-auth>
</template>
<script>
import LayoutAuth from "../layouts/LayoutAuth";
import { mapState } from "vuex";
import Cookies from "js-cookie";
import config from "../config";

export default {
  components: {
    LayoutAuth
  },
  data() {
    return {
      formCurrentStep: 1,
      formMaximumSteps: 2,
      AffiliateOrganisationTags: [],
      AffiliateLocationTags: [],
      EmployerLocationTags: [],
      form: {
        type: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        accept_terms: false,
        referral_code: null,
        employer_org_name: "",
        employer_org_core_services: "",
        employer_org_size: "",
        employer_org_contact: "",
        employer_org_locations: ""
      }
    };
  },

  computed: {
    ...mapState("auth", {
      regError: state => state.regError,
      regSuccess: state => state.regSuccess,
      validationErrors: state => state.validationErrors
    })
  },

  // eslint-disable-next-line
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // Check if routes is a referral link and save to cookie
      if (vm.$route.params.referralCode) {
        Cookies.set(
          config.referralCodeStorageKey,
          vm.$route.params.referralCode,
          {
            expires: 30,
            path: "/",
            domain: window.location.hostname,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
          }
        );
        vm.$router.replace({ name: "register" });
      }
    });
  },
  mounted() {
    this.$store.commit("auth/REMOVE_ERROR_SUCCESS");
    // get referral code if any
    let referralCode = Cookies.get(config.referralCodeStorageKey);
    if (referralCode && referralCode != undefined) {
      this.form.referral_code = Cookies.get(config.referralCodeStorageKey);
    }
  },
  methods: {
    register() {
      if (this.form.type === "employer" || this.form.type === "affiliate") {
        this.formMaximumSteps = 3;
      }
      if (this.formCurrentStep === this.formMaximumSteps) {
        let loader = this.$loading.show({}); // vue-loading-overlay option
        this.$store.dispatch("auth/register", this.form).then(() => {
          if (this.regSuccess !== false && this.regError === false) {
            // delete referral code cookie if any
            Cookies.remove(config.referralCodeStorageKey, {
              path: "/",
              domain: window.location.hostname
            });
            // if (
            //   this.$route.query.returnTo === "/register" ||
            //   this.$route.query.returnTo === "/logout"
            // ) {
            //   this.$router.replace({ name: "dashboard" });
            // } else {
            //   if (this.$route.query.returnTo) {
            //     this.$router.replace(this.$route.query.returnTo);
            //   } else {
            //     this.$router.replace({ name: "dashboard" });
            //   }
            // }
            this.$router.replace({ name: "login" });
          } else {
            this.formCurrentStep--;
            this.$refs.form.setErrors(this.validationErrors); // set VeeValidation error
          }
          loader.hide(); // vue-loading-overlay instance method
        });
      } else {
        this.formCurrentStep++;
      }
    }
  },

  head: {
    title: function() {
      return {
        inner: "Create Account"
      };
    }
  }
};
</script>
<style type="text/css">
.md-select-value {
  border: none !important;
}
.intl-tel-input {
  display: table-cell;
}
.intl-tel-input .selected-flag {
  z-index: 4;
}
.intl-tel-input .country-list {
  z-index: 5;
}
.input-group .intl-tel-input .form-control {
  border-top-left-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 0;
}
.iti-flag {
  background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.3/img/flags.png");
}

@media only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min--moz-device-pixel-ratio: 2),
  only screen and (-o-min-device-pixel-ratio: 2 / 1),
  only screen and (min-device-pixel-ratio: 2),
  only screen and (min-resolution: 192dpi),
  only screen and (min-resolution: 2dppx) {
  .iti-flag {
    background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.3/img/flags@2x.png");
  }
}
.input-group .form-control,
.intl-tel-input {
  width: 100%;
}
.vue-tel-input {
  width: 100% !important;
  border: none !important;
}
.form-row {
  border-bottom: 1px solid gray;
}
.tags-input-wrapper-default {
  padding: 0.25em 0.25em !important;
}
.tags-input-wrapper-default input {
  border: none !important;
  width: 100% !important;
  padding-left: 7px !important;
}
.tags-input-root {
  width: 100% !important;
  margin-left: 0.85em !important;
}
</style>
