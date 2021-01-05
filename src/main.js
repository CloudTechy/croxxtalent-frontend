/* src/main.js */
/* 
  ###################### CROXXTALENT ######################
*/

// ==================== CORE ====================
import Vue from "vue";

// i18n
import i18n from "./i18n";

// Config
import config from "./config";

//material vue
import {
  MdButton,
  MdField,
  MdMenu,
  MdLayout,
  MdList
} from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdMenu);
Vue.use(MdLayout);
Vue.use(MdList);

//jquery
// const { JSDOM } = require("jsdom");
// const { vueWindow } = new JSDOM("");
// const window.$ = require("jquery")(vueWindow);

// BootstrapVue
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

//install vue-tel-input
import vueTelInput from "vue-tel-input";
Vue.use(vueTelInput);

//vue tag-input
import VoerroTagsInput from "@voerro/vue-tagsinput";
Vue.component("tags-input", VoerroTagsInput);
import "@voerro/vue-tagsinput/dist/style.css"; // vue-tagsinput styles

// Vuesax Component Framework
import Vuesax from "vuesax";
import "material-icons/iconfont/material-icons.css"; // Material Icons
import "vuesax/dist/vuesax.css"; // Vuesax styles
Vue.use(Vuesax);

// BoxIcons
import "boxicons";
import "boxicons/css/boxicons.min.css";

// Datepicker

// VueParticles
import VueParticles from "vue-particles";
Vue.use(VueParticles);

// import Select2Component
import Select2 from "v-select2-component";

Vue.component("Select2", Select2);
new Vue({
  // ...
});

// VueFormWizard
import VueFormWizard from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
Vue.use(VueFormWizard);

// Vue Head
import VueHead from "vue-head";
Vue.use(VueHead, {
  separator: "-",
  complement: config.appName
});

// import vue-select
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
// Set the components prop default to return our fresh components
// vSelect.props.components.default = () => ({
//   Deselect: {
//     render: createElement => createElement("span", "❌"),
//   },
//   OpenIndicator: {
//     render: createElement => createElement("span", "🔽"),
//   },
// });
Vue.component("v-select", vSelect);

// Vee Validate
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
// import { required, email } from 'vee-validate/dist/rules';
import { messages } from "vee-validate/dist/locale/en.json";
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
});
// extend('required', {
//   ...required,
//   message: messages['required']
// });
extend("username", {
  validate: value => {
    let regex = RegExp("^((?!-)*)([A-Za-z0-9-]+)((?!-)*)$");
    return regex.test(value);
  },
  message:
    "The {_field_} field may contain alpha-numeric characters as well as dashes."
});
extend("internal_identifier", {
  validate: value => {
    let regex = RegExp("^((?!-)*)([A-Za-z0-9-]+)((?!-)*)$");
    return regex.test(value);
  },
  message:
    "The {_field_} field may contain alpha-numeric characters as well as dashes."
});
Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);

// Vue Loading Overlay
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading, {
  canCancel: false,
  color: "#0040a1",
  backgroundColor: "#fff",
  loader: "dots" // spinner, dots, bars
});

// vue-sweetalert2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2, {
  // confirmButtonColor: "#41b882",
  // cancelButtonColor: "#ff7674",
  reverseButtons: false,
  buttonsStyling: false,
  customClass: {
    confirmButton: "btn btn-primary mx-2",
    cancelButton: "btn btn-secondary mx-2"
  }
});

// Vue Moment.js
Vue.use(require("vue-moment"));

// vue-scrollto
var VueScrollTo = require("vue-scrollto");
Vue.use(VueScrollTo);

import InfiniteLoading from "vue-infinite-loading";
Vue.use(InfiniteLoading, {
  /* options */
});

// VueEllipseProgress
import VueEllipseProgress from "vue-ellipse-progress";
Vue.use(VueEllipseProgress);

// Vue2Editor
import Vue2Editor from "vue2-editor";
Vue.use(Vue2Editor);

// Cleave JS
import Cleave from "vue-cleave-component";
Vue.use(Cleave);

// ==================== ***** ====================
// axios
import axios from "./axios";
Vue.prototype.$http = axios;

// Theme Configurations
import "../themeConfig.js";

// ==================== ***** ====================
// Service Worker
import "./registerServiceWorker";

// Router
import router from "./router";

// Vuex Store
import store from "./store";

// Import Custom Js
import "./assets/js/script.js";

// Import Custom Styles
import "./assets/scss/main.scss";

// Tailwind
import "@/assets/css/main.css";

// ==================== RUN APP ====================
// pp entry component
import App from "./App.vue";
// const App = () => import(/* webpackChunkName: "entry-app" */ "./App.vue");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

// mock
import "./fake-db/index.js";

// Globally Registered Components
import "./globalComponents.js";

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from "vue2-hammer";
Vue.use(VueHammer);

// Feather font icon
require("./assets/css/iconfont.css");
