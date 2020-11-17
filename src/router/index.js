import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store"; // import Vuex store logics
import config from "../config";

// Vue Loading Overlay
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading, {
  canCancel: false,
  color: "#0040a1",
  backgroundColor: "#fff",
  loader: "dots" // spinner, dots, bars
});
let loader = null;
function showLoader() {
  hideLoader();
  loader = Vue.$loading.show();
}
function hideLoader() {
  // destroy previous
  if (loader) {
    loader.hide();
    loader = null;
  }
}

// VueRouter
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "homer",
    redirect: "/login"
  },
  {
    path: "/contact",
    name: "contact",
    beforeEnter: () => {
      window.location.href = config.landingUrl + "/contact";
    }
  },
  {
    path: "/terms",
    name: "terms",
    beforeEnter: () => {
      window.location.href = config.landingUrl + "/terms";
    }
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/password-reset",
    name: "password-reset",
    component: () =>
      import(
        /* webpackChunkName: "password-reset" */ "../views/PasswordReset.vue"
      ),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Logout.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/referral/:referralCode",
    name: "referral-link",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/cv-builder",
    name: "cvBuilder",
    component: () =>
      import(
        /* webpackChunkName: "cv-builder" */ "../views/talent/cv-builder/CvBuilder.vue"
      ),
    meta: {
      requiresAuth: true,
      acl: {
        allowedUserTypes: ["talent"],
        allowedPermissions: ["*"]
      }
    }
  },
  {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
    path: "",
    component: () => import("../layouts/Main.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/settings",
        name: "settings",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/shared/settings/Settings.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Settings", active: true }
          ],
          pageTitle: "Settings",
          requiresAuth: true
        }
      },
      {
        path: "/my-job",
        name: "my-jobs",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/talent/JobInvitations.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "My Job Invitations", active: true }
          ],
          pageTitle: "My Job Invitations",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["talent"],
            allowedPermissions: ["*"]
          }
        }
      },
      {
        path: "/create-campaign",
        name: "create-campaign",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/employer/CampaignForm.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Create A Campaign", active: true }
          ],
          pageTitle: "Create A Campaign",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["employer"],
            allowedPermissions: ["*"]
          }
        }
      },
      {
        path: "/edit-campaign/:id",
        name: "edit-campaign",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/employer/CampaignForm.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Edit Campaign", active: true }
          ],
          pageTitle: "Edit Campaign",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["employer"],
            allowedPermissions: ["*"]
          }
        }
      },
      {
        path: "/campaigns",
        name: "campaigns",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/employer/Campaigns.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Campaigns", active: true }
          ],
          pageTitle: "Campaigns",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["employer"],
            allowedPermissions: ["*"]
          }
        }
      },
      {
        path: "/find-talents",
        name: "find_talents",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/employer/FindTalent.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Talents", active: true }
          ],
          pageTitle: "Find Talent",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["employer"],
            allowedPermissions: ["*"]
          }
        }
      },
      {
        path: "/invited-talents",
        name: "invited-talents",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/employer/InvitedTalents.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Invited Talent", active: true }
          ],
          pageTitle: "Invited Talent",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["employer"],
            allowedPermissions: ["*"]
          }
        }
      },
      {
        path: "/manage-subscription",
        name: "manage-subscription",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/employer/subscription/ManageSubscription.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Manage Subscription", active: true }
          ],
          pageTitle: "Manage Subscription",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["employer"],
            allowedPermissions: ["*"]
          }
        }
      },
      {
        path: "/upgrade-subscription",
        name: "upgrade-subscription",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/employer/subscription/UpgradeSubscription.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Upgrade Subscription", active: true }
          ],
          pageTitle: "Upgrade Subscription",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["employer"],
            allowedPermissions: ["*"]
          }
        }
      },
      {
        path: "/monthly-subscription",
        name: "monthly-subscription",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/employer/subscription/plan/MonthlySubscription.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Monthly Subscription", active: true }
          ],
          pageTitle: "Monthly Subscription",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["employer"],
            allowedPermissions: ["*"]
          }
        }
      },
      {
        path: "/yearly-subscription",
        name: "yearly-subscription",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/employer/subscription/plan/YearlySubscription.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Yearly Subscription", active: true }
          ],
          pageTitle: "Yearly Subscription",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["employer"],
            allowedPermissions: ["*"]
          }
        }
      },
      {
        path: "/affiliates/referrals",
        name: "affiliate-referrals",
        component: () =>
          import(
            /* webpackChunkName: "affiliates" */ "../views/affiliate/Affiliates.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Affiliate Referrals", active: true }
          ],
          pageTitle: "Affiliate Referrals",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["affiliate"],
            allowedPermissions: ["*"]
          }
        }
      },
      {
        path: "/admin/users/talents",
        name: "admin-users-talents",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/admin/TalentUsers.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Users", active: true },
            { title: "Talents", active: true }
          ],
          pageTitle: "Talents",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["admin"],
            allowedPermissions: [
              "owner",
              "admin",
              "view-all-talent",
              "view-talent",
              "create-talent",
              "update-talent",
              "delete-talent"
            ]
          }
        }
      },
      {
        path: "/admin/users/employers",
        name: "admin-users-employers",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/admin/EmployerUsers.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Users", active: true },
            { title: "Talents", active: true }
          ],
          pageTitle: "Talents",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["admin"],
            allowedPermissions: [
              "owner",
              "admin",
              "view-all-employer",
              "view-employer",
              "create-employer",
              "update-employer",
              "delete-employer"
            ]
          }
        }
      },
      {
        path: "/admin/users/admins",
        name: "admin-users-admins",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/admin/AdminUsers.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Users", active: true },
            { title: "Admins", active: true }
          ],
          pageTitle: "Admins",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["admin"],
            allowedPermissions: [
              "owner",
              "admin",
              "view-all-admin",
              "view-admin",
              "create-admin",
              "update-admin",
              "delete-admin"
            ]
          }
        }
      },
      {
        path: "/admin/campaigns",
        name: "admin-campaigns",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/admin/Campaigns.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Admin", active: true },
            { title: "Campaigns", active: true }
          ],
          pageTitle: "Campaigns",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["admin"],
            allowedPermissions: [
              "owner",
              "admin",
              "view-all-campaign",
              "view-campaign",
              "create-campaign",
              "update-campaign",
              "delete-campaign"
            ]
          }
        }
      },
      {
        path: "/admin/create-campaign",
        name: "admin-create-campaign",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/admin/CampaignForm.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Create A Campaign", active: true }
          ],
          pageTitle: "Create A Campaign",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["admin"],
            allowedPermissions: ["owner", "admin", "create-campaign"]
          }
        }
      },
      {
        path: "/admin/edit-campaign/:id",
        name: "admin-edit-campaign",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/admin/CampaignForm.vue"
          ),
        meta: {
          breadcrumb: [
            { title: "Home", url: "/" },
            { title: "Edit Campaign", active: true }
          ],
          pageTitle: "Edit Campaign",
          requiresAuth: true,
          acl: {
            allowedUserTypes: ["admin"],
            allowedPermissions: ["owner", "admin", "update-campaign"]
          }
        }
      }
    ]
  },
  {
    path: "/not-authorized",
    name: "not-authorized",
    component: () =>
      import(
        /* webpackChunkName: "not-authorized" */ "../views/NotAuthorized.vue"
      )
  },
  {
    path: "/error-500",
    name: "error500",
    component: () =>
      import(/* webpackChunkName: "error500" */ "../views/Error500.vue")
  },
  {
    path: "*",
    name: "error404",
    component: () =>
      import(/* webpackChunkName: "error404" */ "../views/Error404.vue")
  }
];

// Create instance of VueRouter
const router = new VueRouter({
  mode: "history", // hash | history
  base: process.env.BASE_URL,
  routes
});

// Router event config
router.beforeEach((to, from, next) => {
  // Remove initial page loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }

  // If this isn't an initial page load.
  if (to.name) {
    showLoader(); // vue-loading-overlay
  }

  // redirect authenticated page
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/isLoggedIn"]) {
      store.dispatch("auth/authenticateSession", to).then(() => {
        // START check ACL
        if (to.matched.some(record => record.meta.acl)) {
          to.matched.some(function(route) {
            let acl = route.meta.acl;
            if (acl) {
              // init acl check values
              let checkAllowedUserTypes = false;
              let checkAllowedPermissions = false;
              let allowedUserTypes = [];
              let allowedPermissions = [];
              let hasValidUserTypes = false;
              let hasValidPermissions = false;
              let aclAccessGranted = false;
              //
              if (acl.allowedUserTypes) {
                checkAllowedUserTypes = true;
                allowedUserTypes = acl.allowedUserTypes;
              }
              if (acl.allowedPermissions) {
                checkAllowedPermissions = true;
                allowedPermissions = acl.allowedPermissions;
              }
              //
              let user = store.getters["auth/getUser"]; // user data
              // check user type acl
              if (checkAllowedUserTypes) {
                if (allowedUserTypes.includes("*")) {
                  hasValidUserTypes = true;
                } else {
                  hasValidUserTypes = allowedUserTypes.includes(user.type);
                }
              }
              // check permissions acl
              if (checkAllowedPermissions) {
                if (allowedPermissions.includes("*")) {
                  hasValidPermissions = true;
                } else {
                  if (user.permissions) {
                    user.permissions.forEach(function(permission) {
                      if (allowedPermissions.includes(permission)) {
                        hasValidPermissions = true;
                      }
                    });
                  }
                }
              }
              // verify acl check
              if (checkAllowedUserTypes && checkAllowedPermissions) {
                aclAccessGranted =
                  hasValidUserTypes && hasValidPermissions ? true : false;
              } else {
                aclAccessGranted =
                  hasValidUserTypes || hasValidPermissions ? true : false;
              }
              if (aclAccessGranted) {
                next();
              } else {
                next({ name: "not-authorized" });
              }
            }
          });
        } else {
          next(); // Proceed, no ACL restrictions defined
        }
        // END check ACL
      });
    } else {
      if (to.name === "login" || to.name === "logout") {
        next({ name: "login" });
      } else {
        next({ name: "login", query: { returnTo: to.fullPath } });
      }
    }

    // redirect guest page
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters["auth/isLoggedIn"]) {
      next({ name: "dashboard" });
      return;
    }
    next();
  } else {
    next();
  }
});

router.afterEach(() => {
  // authenticate session
  //store.dispatch('auth/authenticateSession');

  // vue-loading-overlay
  hideLoader();
});

router.onError(() => {
  // vue-loading-overlay
  // hideLoader();
});

export default router;
