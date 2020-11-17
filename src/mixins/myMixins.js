import Vue from "vue";
Vue.use(require("vue-moment"));

import { createPopper } from "@popperjs/core";

export default {
  data() {
    return {
      vSelectPopperplacement: "bottom" // top|bottom
    };
  },

  methods: {
    $_formatDataTableDateTime: function(renderParams) {
      return renderParams.row.created_at
        ? Vue.moment(renderParams.row.created_at).format("lll")
        : "";
    },

    $_formatDateTime: function(dt) {
      return Vue.moment(dt).format("lll");
    },

    $_getYearFoundedList: function() {
      let yearFoundedList = [];
      let cYear = new Date().getFullYear();
      for (let i = cYear; i >= 1600; i--) {
        yearFoundedList.push({ value: i, label: i });
      }
      return yearFoundedList;
    },

    $_toTitleCase: function(str) {
      str = str.toLowerCase().split(" ");
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(" ");
    },

    $_truncateString: function(str, num) {
      // If the length of str is less than or equal to num
      // just return str--don't truncate it.
      if (str.length <= num) {
        return str;
      }
      // Return str truncated with "..." concatenated to the end of str.
      return str.slice(0, num) + "...";
    },

    $_openNewWindowCenter: function(
      url,
      title = "New Window",
      w = 400,
      h = 460
    ) {
      // Fixes dual-screen position Most browsers Firefox
      var dualScreenLeft =
        window.screenLeft != undefined ? window.screenLeft : screen.left;
      var dualScreenTop =
        window.screenTop != undefined ? window.screenTop : screen.top;

      let width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
      let height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;

      var left = width / 2 - w / 2 + dualScreenLeft;
      var top = height / 2 - h / 2 + dualScreenTop;
      var windowFeatures =
        "location=no,copyhistory=no,menubar=no,toolbar=no,scrollbars=yes,status=yes,centerscreen=yes,chrome=yes";
      var newWindow = window.open(
        url,
        title,
        `${windowFeatures},width=${w},height=${h},top=${top},left=${left}`
      );
      // Puts focus on the newWindow
      if (window.focus) {
        newWindow.focus();
      }
      return newWindow;
    },

    $_getFormValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    $_genderDataSet: function() {
      return {
        male: {
          id: "male",
          name: "Male"
        },
        female: {
          id: "female",
          name: "Female"
        }
      };
    },

    $_skillLevelDataSet: function() {
      return {
        basic: {
          id: "basic",
          name: "Basic"
        },
        intermediate: {
          id: "intermediate",
          name: "Intermediate"
        },
        advanced: {
          id: "advanced",
          name: "Advanced"
        }
      };
    },

    $_languageLevelDataSet: function() {
      return {
        basic: {
          id: "basic",
          name: "Basic"
        },
        intermediate: {
          id: "intermediate",
          name: "Intermediate"
        },
        advanced: {
          id: "advanced",
          name: "Advanced"
        }
      };
    },

    $_workTypeDataSet: function() {
      return {
        contract: {
          id: "contract",
          name: "Contract"
        },
        fulltime: {
          id: "fulltime",
          name: "Full-Time"
        },
        internship: {
          id: "internship",
          name: "Internship"
        },
        parttime: {
          id: "parttime",
          name: "Part-Time"
        }
      };
    },

    $_currencyDataSet: function() {
      return {
        NGN: {
          id: "NGN",
          name: "Nigerian Naira"
        },
        USD: {
          id: "USD",
          name: "US Dollar"
        }
      };
    },

    $_yearsOfExperienceDataSet: function() {
      let arrYears = [];
      let maxYears = 20;
      let yrLabel = "Year";
      for (let i = 1; i <= maxYears; i++) {
        if (i == 1) {
          yrLabel = "Year";
        } else if (i == 20) {
          yrLabel = "Years+";
        } else {
          yrLabel = "Years";
        }
        arrYears[i] = {
          id: i,
          name: `${i} ${yrLabel}`
        };
      }
      return arrYears;
    },

    $_numberOfPositionsDataSet: function() {
      let arrPositions = [];
      let maxPositions = 1000;
      let pLabel = "position";
      for (let i = 1; i <= maxPositions; i++) {
        if (i == 1) {
          pLabel = "position";
        } else {
          pLabel = "positions";
        }
        arrPositions[i] = {
          id: i,
          name: `${i} ${pLabel}`
        };
      }
      return arrPositions;
    },

    // v-select Dropdown Position fix
    withPopper(dropdownList, component, { width }) {
      /**
       * We need to explicitly define the dropdown width since
       * it is usually inherited from the parent with CSS.
       */
      dropdownList.style.width = width;

      /**
       * Here we position the dropdownList relative to the $refs.toggle Element.
       *
       * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
       * the dropdownList overlap by 1 pixel.
       *
       * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
       * wrapper so that we can set some styles for when the dropdown is placed
       * above.
       */
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.vSelectPopperplacement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, -1]
            }
          },
          {
            name: "toggleClass",
            enabled: true,
            phase: "write",
            fn({ state }) {
              component.$el.classList.toggle(
                "drop-up",
                state.placement === "top"
              );
              component.$el.classList.toggle(
                "drop-down",
                state.placement === "bottom"
              );
            }
          }
        ]
      });

      /**
       * To prevent memory leaks Popper needs to be destroyed.
       * If you return function, it will be called just before dropdown is removed from DOM.
       */
      return () => popper.destroy();
    }
  }
};
