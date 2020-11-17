<template>
  <div
    id="scroll-to-table-top"
    class="data-list-thumb-view data-list-container"
  >
    <vs-table
      ref="table"
      v-model="selectedRecords"
      :sst="true"
      :max-items="dataTableFilter.per_page"
      :data="jobInvitationsDataSet"
      :total="jobInvitationsDataSetTotal"
      search
      :no-data-text="
        loadingJobInvitationsDataSet
          ? 'Loading Data... Please wait!'
          : 'No Data Available.'
      "
      @search="handleDataTableSearch"
      @change-page="handleDataTableChangePage"
      @sort="handleDataTableSort"
      @selected="handleDataTableSelected"
      @dblSelection="handleDataTableDoubleSelection"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2">{{ dataTableStats }}</span>
            <feather-icon icon="ChevronDownIcon" svg-classes="h-4 w-4" />
          </div>
          <vs-dropdown-menu>
            <vs-dropdown-item @click="changeDataTablePerPage(25)">
              <span>25</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="changeDataTablePerPage(50)">
              <span>50</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="changeDataTablePerPage(100)">
              <span>100</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th sort-key="name">Name</vs-th>
        <vs-th>Email</vs-th>
        <vs-th>Phone</vs-th>
        <vs-th>Job Title</vs-th>
        <vs-th>Status</vs-th>
        <vs-th sort-key="created_at">Date/Time</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <b-overlay
            :show="loadingJobInvitationsDataSet"
            rounded="sm"
            opacity="0.7"
            no-wrap
            style="min-height: 11rem;"
          >
          </b-overlay>
          <vs-tr
            v-for="(jobInvitations, index) in data"
            :key="index"
            :data="jobInvitations"
          >
            <vs-td>
              <p class="item-name font-medium truncate">
                <!-- {{ cv.title.toUpperCase() }} -->
                {{ $_toTitleCase(jobInvitations.cv.name) }}
              </p>
            </vs-td>
            <vs-td>
              <p class="font-medium">
                {{ jobInvitations.cv.email }}
              </p>
            </vs-td>
            <vs-td>
              <p class="font-medium">
                {{ jobInvitations.cv.phone }}
              </p>
            </vs-td>
            <vs-td>
              <p class="font-medium">
                {{ jobInvitations.cv.job_title_name }}
              </p>
            </vs-td>
            <vs-td>
              <vs-chip :color="getStatusColor(jobInvitations.status)" class="">
                {{ jobInvitations.status }}
              </vs-chip>
            </vs-td>
            <vs-td>
              <p class="font-medium">
                {{
                  jobInvitations.cv.created_at | moment("MMM D, YYYY h:mm A")
                }}
              </p>
            </vs-td>
            <vs-td class="whitespace-no-wrap">
              <feather-icon
                v-if="jobInvitations.status === 'pending'"
                v-b-tooltip.hover
                title="Accept Job Invitation"
                icon="CheckIcon"
                svg-classes="w-5 h-5 hover:text-success stroke-current"
                class="ml-2"
                @click="
                  acceptJobInvitation(
                    jobInvitations.id,
                    `${jobInvitations.employer.display_name}`
                  )
                "
              />
              <feather-icon
                v-if="jobInvitations.status === 'pending'"
                v-b-tooltip.hover
                title="Reject Job Invitation"
                icon="XIcon"
                svg-classes="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="
                  rejectJobInvitation(
                    jobInvitations.id,
                    `${jobInvitations.employer.display_name}`
                  )
                "
              />
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <vs-pagination
      v-show="jobInvitationsDataSetLastPage > 1"
      v-model="dataTableFilter.page"
      :total="jobInvitationsDataSetLastPage"
      :max="9"
      :goto="true"
    ></vs-pagination>
  </div>
</template>

<style lang="scss">
//
</style>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import myMixins from "../../mixins/myMixins.js";

export default {
  components: {
    //
  },

  mixins: [myMixins],

  data() {
    return {
      selectedRecords: [],
      dataTableFilter: {
        per_page: 25, // 25, -1 or all = all records,
        page: 1,
        search: null,
        sort_by: "created_at",
        sort_dir: "desc"
      },
      dataTableFilterPayload: {}
    };
  },

  computed: {
    ...mapState("users", {
      loadingJobInvitationsDataSet: state => state.loadingJobInvitationsDataSet,
      error: state => state.error,
      success: state => state.success,
      validationErrors: state => state.validationErrors,
      jobInvitationsDataSet: state => state.jobInvitationsDataSet,
      jobInvitationsDataSetTotal: state => state.jobInvitationsDataSetTotal,
      jobInvitationsDataSetLastPage: state =>
        state.jobInvitationsDataSetLastPage
    }),

    currentPage() {
      return this.dataTableFilter.page;
    },

    dataTableStats() {
      let fromRecord =
        this.currentPage * this.dataTableFilter.per_page -
        (this.dataTableFilter.per_page - 1);
      let toRecord =
        this.jobInvitationsDataSetTotal -
          this.currentPage * this.dataTableFilter.per_page >
        0
          ? this.currentPage * this.dataTableFilter.per_page
          : this.jobInvitationsDataSetTotal;
      let ofTotal = this.jobInvitationsDataSetTotal;
      return `${fromRecord} - ${toRecord} of ${ofTotal}`;
    }

    // queriedItems() {
    //   return this.$refs.table
    //     ? this.$refs.table.queriedResults.length
    //     : this.products.length;
    // }
  },

  watch: {
    currentPage: function() {
      this.$scrollTo("#scroll-to-table-top");
      this.loadRecords();
    }
  },

  created() {
    //
  },

  mounted() {
    this.loadRecords();
  },

  methods: {
    handleDataTableSearch: _.debounce(function(searching) {
      this.dataTableFilter.search = searching;
      this.dataTableFilter.page = 1;
      this.loadRecords();
    }, 2500),

    handleDataTableChangePage(page) {
      this.dataTableFilter.page = page;
      this.loadRecords();
    },

    handleDataTableSort(key, active) {
      this.dataTableFilter.sort_by = key;
      this.dataTableFilter.sort_dir = active;
      this.dataTableFilter.page = 1;
      this.loadRecords();
    },
    // eslint-disable-next-line
    handleDataTableSelected(tr)  {
      //
    },
    // eslint-disable-next-line
    handleDataTableDoubleSelection(tr)  {
      //
    },

    changeDataTablePerPage(per_page) {
      this.dataTableFilter.page = 1;
      this.dataTableFilter.per_page = per_page;
      this.loadRecords();
    },

    getStatusColor(value) {
      if (value === "pending") return "warning";
      if (value === "accepted") return "success";
      if (value === "rejected") return "danger";
      return "warning";
    },

    loadRecords() {
      let vm = this;
      this.dataTableFilterPayload = this.dataTableFilter;
      let payload = {
        ...this.dataTableFilterPayload
      };
      vm.$store
        .dispatch("users/jobInvitations", {
          id: this.$store.state.auth.user.id,
          payload: payload
        })
        .then(() => {
          // this.recordsLoading = false;
        });
    }, // loadRecords()

    acceptJobInvitation(id, name = "") {
      this.selectedRecords = [];
      this.$swal
        .fire({
          type: "warning",
          title: `Are you sure you want to accept job invitation from "${name}"?`,
          text: "",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: "Yes, Accept it!",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success mx-2",
            cancelButton: "btn btn-secondary mx-2"
          },
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.$store
              .dispatch("jobInvitations/accept", id)
              .then(() => {
                if (
                  this.$store.state.jobInvitations.success !== false &&
                  this.$store.state.jobInvitations.error === false
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
              let msg = this.$store.state.jobInvitations.success;
              this.$store.commit("jobInvitations/REMOVE_ERROR_SUCCESS");
              this.selectedRecords = [];
              this.loadRecords();
              this.$swal.fire("", msg, "success");
            } else {
              let msg = this.$store.state.jobInvitations.error;
              this.$swal.fire("", msg, "error");
            }
          }
        }); // this.$swal.fire({...})
    }, // acceptJobInvitation()

    rejectJobInvitation(id, name = "") {
      this.selectedRecords = [];
      this.$swal
        .fire({
          type: "warning",
          title: `Are you sure you want to reject job invitation from "${name}"?`,
          text: "",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: "Yes, Reject it!",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-danger mx-2",
            cancelButton: "btn btn-secondary mx-2"
          },
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.$store
              .dispatch("jobInvitations/reject", id)
              .then(() => {
                if (
                  this.$store.state.jobInvitations.success !== false &&
                  this.$store.state.jobInvitations.error === false
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
              let msg = this.$store.state.jobInvitations.success;
              this.$store.commit("jobInvitations/REMOVE_ERROR_SUCCESS");
              this.selectedRecords = [];
              this.loadRecords();
              this.$swal.fire("", msg, "success");
            } else {
              let msg = this.$store.state.jobInvitations.error;
              this.$swal.fire("", msg, "error");
            }
          }
        }); // this.$swal.fire({...})
    } // rejectJobInvitation()
  }
};
</script>
