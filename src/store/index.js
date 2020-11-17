/* src/store/index.js */
import Vue from "vue";
import Vuex from "vuex";

// import vuex modules
import auth from "./modules/auth";
import users from "./modules/users";
import countries from "./modules/countries";
import states from "./modules/states";
import skills from "./modules/skills";
import courseOfStudies from "./modules/course-of-studies";
import certificationCourses from "./modules/certification-courses";
import jobTitles from "./modules/job-titles";
import industries from "./modules/industries";
import degrees from "./modules/degrees";
import languages from "./modules/languages";
import cvs from "./modules/cvs";
import cvWorkExperiences from "./modules/cv-work-experiences";
import cvEducations from "./modules/cv-educations";
import cvCertifications from "./modules/cv-certifications";
import cvSkills from "./modules/cv-skills";
import cvHobbies from "./modules/cv-hobbies";
import cvAwards from "./modules/cv-awards";
import cvLanguages from "./modules/cv-languages";
import cvReferences from "./modules/cv-references";
import campaigns from "./modules/campaigns";
import jobInvitations from "./modules/job-invitations";
//
import state from "./state";
import getters from "./getters";
import actions from "./actions";
// import mutations from "./mutations";

Vue.use(Vuex);

// import moduleTodo from './todo/moduleTodo.js'
// import moduleCalendar from './calendar/moduleCalendar.js'
// import moduleChat from './chat/moduleChat.js'
// import moduleEmail from './email/moduleEmail.js'

Vue.use(Vuex);

export default new Vuex.Store({
  // Making sure that we're doing
  // everything correctly by enabling
  // strict mode in the dev environment.
  // strict mode prevents mutating the state directly, so you can only mutate the state using mutations.
  strict: process.env.NODE_ENV !== "production",
  mutations: {
    // Requered by Admin dashboard UI
    TOGGLE_CONTENT_OVERLAY(state, val) {
      state.bodyOverlay = val;
    },
    UPDATE_PRIMARY_COLOR(state, val) {
      state.themePrimaryColor = val;
    },
    UPDATE_THEME(state, val) {
      state.theme = val;
    },
    UPDATE_WINDOW_WIDTH(state, width) {
      state.windowWidth = width;
    },
    UPDATE_WINDOW_SCROLL_Y(state, val) {
      state.scrollY = val;
    },
    // Vertical NavMenu
    TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
      state.isVerticalNavMenuActive = value;
    },
    TOGGLE_REDUCE_BUTTON(state, val) {
      state.reduceButton = val;
    },
    UPDATE_MAIN_LAYOUT_TYPE(state, val) {
      state.mainLayoutType = val;
    },
    UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
      state.verticalNavMenuItemsMin = val;
    },
    UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
      state.verticalNavMenuWidth = width;
    }
  },
  modules: {
    auth,
    users,
    countries,
    states,
    skills,
    courseOfStudies,
    certificationCourses,
    jobTitles,
    industries,
    degrees,
    languages,
    cvs,
    cvWorkExperiences,
    cvEducations,
    cvCertifications,
    cvSkills,
    cvHobbies,
    cvAwards,
    cvLanguages,
    cvReferences,
    campaigns,
    jobInvitations
  },
  getters,
  state,
  // mutations,
  actions
});
