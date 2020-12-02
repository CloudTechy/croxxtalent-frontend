<template>
  <layout-auth style="height:100%;">
    <b-container fluid class="login-container">
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

      <b-row class="login-page">
        <b-col order="1" md class="login-left">
          <b-row class="ml-5 mt-6">
            <a href="/dashboard">
              <img
                alt="Croxx Talent"
                src="@/assets/images/logoinverse.png"
                width="300"
                class="float-left"
              />
            </a>
          </b-row>

          <b-row>
            <b-col class=" card-title text-center">
              <h1>Don't Have An Account?</h1>
              <p>
                Croxx Talent is a platform where you can get hired by top oil
                and gas companies by simply following some simple instructions.
              </p>
              <!-- eslint-disable-next-line -->
              <router-link
                :to="{ name: 'register' }"
                tag="a"
                class="btn btn-lg button-link"
                >Create Account</router-link
              >
            </b-col>
          </b-row>
        </b-col>

        <b-col order="5" md class="login-right">
          <div>
            <b-row class="ml-5 mt-6 temp-logo">
              <a href="/dashboard">
                <img
                  alt="Vue logo"
                  src="@/assets/images/logo.png"
                  width="300"
                  class="float-left"
                />
              </a>
            </b-row>
            <div>
              <div class="text-center">
                <h1 class="mb-1">Welcome back!</h1>
                <p class="px-2 text-center">
                  Please fill in your information and get logged in
                </p>
              </div>
            </div>

            <!--
                    <div class="row center social-auth">
                        <div class="social-list">
                            <p>
                                <img src="@/assets/images/icons/linkedin.png" alt="" width="45" />
                                <img class="ml-6 mr-6" src="@/assets/images/icons/google-icon.png" alt="" width="45" />
                                <img src="@/assets/images/icons/mail.png" alt="" width="45" />
                            </p>
                        </div>
                    </div>
                    -->

            <b-row class="justify-content-md-center">
              <b-col col lg="8">
                <p v-if="error">
                  <b-alert variant="danger" show>
                    {{ error }}
                    <!-- eslint-disable-next-line -->
                    <ul
                      v-for="(item, index) in validationErrors"
                      :key="index"
                      class="ml-6"
                      style="list-style-type:disc"
                    >
                      > >
                      <li>{{ item[0] }}</li>
                    </ul>
                  </b-alert>
                </p>
                <p v-if="success">
                  <!-- eslint-disable-next-line -->
                  <b-alert variant="success" show>{{ success }}</b-alert>
                </p>
                <p v-if="regSuccess">
                  <!-- eslint-disable-next-line -->
                  <b-alert variant="success" show>{{ regSuccess }}</b-alert>
                </p>
              </b-col>
            </b-row>

            <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
              <form @submit.prevent="handleSubmit(login)">
                <div class="center content-inputs">
                  <validation-provider
                    v-slot="validationContext"
                    vid="email"
                    name="Email"
                    rules="required|email|max:150"
                  >
                    <vs-input
                      v-model.trim="form.login"
                      type="text"
                      class="w-full"
                      size="large"
                      label-placeholder="Email"
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
                </div>
                <div class="center content-inputs mb-3">
                  <validation-provider
                    v-slot="validationContext"
                    vid="password"
                    name="Password"
                    rules="required"
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
                <b-row>
                  <b-col style="display:block">
                    <div class="center content-inputs">
                      <b-form-checkbox
                        v-model="form.remember_me"
                        :value="true"
                        :unchecked-value="false"
                        size="lg"
                        class=""
                      >
                        Remember me
                      </b-form-checkbox>
                    </div>
                  </b-col>
                </b-row>
                <div class="center content-inputs">
                  <vs-button class="auth-btn" button="submit" size="meduim">
                    Login
                  </vs-button>
                </div>
                <b-col class="text-left">
                  <router-link :to="{ name: 'password-reset' }" tag="a">
                    Forgot Password?
                  </router-link>
                </b-col>
                <b-col class="text-center">
                  <p>
                    Need an account?
                    <router-link :to="{ name: 'register' }" tag="a">
                      Sign Up
                    </router-link>
                  </p>
                </b-col>
              </form>
            </validation-observer>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </layout-auth>
</template>

<script>
/* eslint-disable prettier/prettier */
import LayoutAuth from "../layouts/LayoutAuth";
import { mapState } from "vuex";

export default {
  components: {
    LayoutAuth,
  },
  data() {
    return {
      form: {
        login: "",
        password: "",
        remember_me: false,
      },
      showPassword: false,
      passwordInputType: "password",
    };
  },

  computed: {
    ...mapState("auth", ["error", "success", "regSuccess", "regError", "validationErrors"]),
    // ...mapState("auth", {
    //   regError: state => state.regError,
    //   regSuccess: state => state.regSuccess,
    //   validationErrors: state => state.validationErrors
    // })
  },

  mounted() {
    // this.$store.commit("auth/REMOVE_ERROR_SUCCESS");
  },

  methods: {
    toggleShowPassword() {
      if (this.passwordInputType === "password") {
        this.showPassword = true;
        this.passwordInputType = "text";
      } else {
        this.showPassword = false;
        this.passwordInputType = "password";
      }
    },

    login() {
      let loader = this.$loading.show({}); // vue-loading-overlay option
      this.$store.dispatch("auth/login", this.form).then(() => {
        if (this.success !== false && this.error === false) {
          if (
            this.$route.query.returnTo === "/login" ||
            this.$route.query.returnTo === "/logout"
          ) {
            this.$router.replace({
              name: "dashboard",
            });
          } else {
            if (this.$route.query.returnTo) {
              this.$router.replace(this.$route.query.returnTo);
            } else {
              this.$router.replace({
                name: "dashboard",
              });
            }
          }
        }
        loader.hide(); // vue-loading-overlay instance method
      });
    },
  },

  head: {
    title: function() {
      return {
        inner: "Login"
      };
    }
  }
};
</script>
