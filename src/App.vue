<template>
  <div id="app000" :class="vueAppClasses" style="height:100%;">
    <router-view @setAppClasses="setAppClasses" />
  </div>
</template>
<style lang="scss"></style>

<script>
import themeConfig from "@/../themeConfig.js";

// Import vue-offline
import { VueOfflineMixin } from "vue-offline";

export default {
  mixins: [VueOfflineMixin],

  data() {
    return {
      vueAppClasses: []
    };
  },

  computed: {
    networkStatus() {
      return this.isOffline ? "offline" : "online";
    }
  },

  watch: {
    networkStatus: function(newNetworkStatusValue) {
      let vm = this;
      let timerInterval;

      if (newNetworkStatusValue === "offline") {
        let countdownTime = 30;
        let countdownTimeRetry = 0;

        this.$swal.fire({
          toast: true,
          type: "warning",
          title: "Connection lost.",
          html: "Reconnecting in <span></span> seconds...",
          showConfirmButton: false,
          allowEscapeKey: false,
          position: "top", // bottom-start | top | top-end
          background: "#f9edbe", // success:#d4edda | error:#f8d7da | warning:#f9edbe
          // timer: 5000,
          onBeforeOpen: function() {
            timerInterval = setInterval(() => {
              const content = vm.$swal.getContent();
              if (content) {
                const span = content.querySelector("span");
                if (span) {
                  span.textContent = countdownTime;
                }
              }
              countdownTime--;
              if (countdownTime <= 0) {
                countdownTimeRetry++;
                if (countdownTimeRetry === 1) {
                  countdownTime = 45;
                } else if (countdownTimeRetry === 2) {
                  countdownTime = 60;
                } else if (countdownTimeRetry === 3) {
                  countdownTime = 90;
                } else if (countdownTimeRetry === 4) {
                  countdownTime = 120;
                } else if (countdownTimeRetry === 5) {
                  countdownTime = 120;
                } else {
                  countdownTime = 30;
                  countdownTimeRetry = 1;
                }
              }
            }, 1000);
          },
          onClose: () => {
            clearInterval(timerInterval);
          }
        });
      }

      if (newNetworkStatusValue === "online") {
        // close offline notice if its open
        if (this.$swal.isVisible()) {
          this.$swal.close();
        }
        this.$swal.fire({
          toast: true,
          type: "success",
          title: "Connection restored.",
          text: "Your computer is connected to the internet.",
          showConfirmButton: false,
          position: "top", // bottom-start | top | top-end
          background: "#d4edda", // success:#d4edda | error:#f8d7da | warning:#f9edbe
          timer: 5000
        });
      }
    },

    "$store.state.theme"(val) {
      this.toggleClassInBody(val);
    },

    "$vs.rtl"(val) {
      document.documentElement.setAttribute("dir", val ? "rtl" : "ltr");
    }
  },

  mounted() {
    this.toggleClassInBody(themeConfig.theme);
    this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);

    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },

  async created() {
    // jwt
    // jwt.init()

    const dir = this.$vs.rtl ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);

    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("scroll", this.handleScroll);

    // Auth0
    // try {
    //   await this.$auth.renewTokens();
    // } catch (e) {
    //   console.error(e);
    // }
  },

  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    toggleClassInBody(className) {
      if (className === "dark") {
        if (document.body.className.match("theme-semi-dark"))
          document.body.classList.remove("theme-semi-dark");
        document.body.classList.add("theme-dark");
      } else if (className === "semi-dark") {
        if (document.body.className.match("theme-dark"))
          document.body.classList.remove("theme-dark");
        document.body.classList.add("theme-semi-dark");
      } else {
        if (document.body.className.match("theme-dark"))
          document.body.classList.remove("theme-dark");
        if (document.body.className.match("theme-semi-dark"))
          document.body.classList.remove("theme-semi-dark");
      }
    },
    setAppClasses(classesStr) {
      this.vueAppClasses.push(classesStr);
    },
    handleWindowResize() {
      this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);

      // Set --vh property
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    },
    handleScroll() {
      this.$store.commit("UPDATE_WINDOW_SCROLL_Y", window.scrollY);
    }
  }
};
</script>
