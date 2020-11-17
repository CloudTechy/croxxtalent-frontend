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
      :data="dataSet"
      :total="dataSetTotal"
      multiple
      search
      :no-data-text="
        loadingDataSet ? 'Loading Data... Please wait!' : 'No Data Available.'
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
        <div class="flex flex-wrap-reverse items-center">
          <!-- ACTION - DROPDOWN -->
          <vs-dropdown
            v-if="selectedRecords.length > 0"
            vs-trigger-click
            class="cursor-pointer mr-4 mb-4"
          >
            <div
              class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32"
            >
              <span class="mr-2">Actions</span>
              <feather-icon icon="ChevronDownIcon" svg-classes="h-4 w-4" />
            </div>

            <vs-dropdown-menu>
              <vs-dropdown-item @click="deleteMultipleRecords">
                <span class="flex items-center">
                  <feather-icon
                    icon="TrashIcon"
                    svg-classes="h-4 w-4"
                    class="mr-2"
                  />
                  <span>Delete</span>
                </span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>

          <!-- Create Campaign Button -->
          <!-- <router-link
            :to="{ name: 'create-campaign' }"
            tag="a"
            class="btn btn-lg border border-solid border-primary text-lg font-medium rounded-lg flex items-center justify-between p-3 mb-4 mr-4"
          >
            <feather-icon icon="PlusIcon" svg-classes="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Create Campaign</span>
          </router-link> -->
        </div>

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
        <vs-th sort-key="first_name">Name</vs-th>
        <vs-th>Email</vs-th>
        <vs-th>Phone</vs-th>
        <vs-th>Status</vs-th>
        <vs-th sort-key="created_at">Registered</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <b-overlay
            :show="loadingDataSet"
            rounded="sm"
            opacity="0.7"
            no-wrap
            style="min-height: 11rem;"
          >
          </b-overlay>
          <vs-tr v-for="(user, index) in data" :key="index" :data="user">
            <vs-td>
              <p class="item-name font-medium truncate">
                <!-- {{ user.name.toUpperCase() }} -->
                {{ $_toTitleCase(user.display_name) }}
              </p>
            </vs-td>
            <vs-td>
              <p class="font-medium">
                {{ user.email }}
              </p>
            </vs-td>
            <vs-td>
              <p class="font-medium">
                {{ user.phone }}
              </p>
            </vs-td>
            <vs-td>
              <p class="font-medium">
                {{ user.created_at | moment("MMM D, YYYY") }}
              </p>
            </vs-td>
            <vs-td>
              <vs-chip :color="getStatusColor(user.is_active)" class="">
                {{ user.is_active ? "Active" : "Inactive" }}
              </vs-chip>
            </vs-td>
            <vs-td>
              <p class="font-medium">
                {{ user.created_at | moment("MMM D, YYYY h:mm A") }}
              </p>
            </vs-td>
            <vs-td class="whitespace-no-wrap">
              <!-- <router-link
                :to="{ name: 'edit-campaign', params: { id: user.id } }"
                tag="a"
                class="text-secondary hover:text-primary"
              >
                <feather-icon
                  icon="EditIcon"
                  svg-classes="w-5 h-5 hover:text-primary stroke-current"
                />
              </router-link> -->
              <feather-icon
                icon="TrashIcon"
                svg-classes="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="deleteRecord(user.id, `${user.display_name}`)"
              />
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <vs-pagination
      v-show="dataSetLastPage > 1"
      v-model="dataTableFilter.page"
      :total="dataSetLastPage"
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
        type: "employer",
        sort_by: "created_at",
        sort_dir: "desc"
      },
      dataTableFilterPayload: {}
    };
  },

  computed: {
    ...mapState("users", {
      loadingDataSet: state => state.loadingDataSet,
      error: state => state.error,
      success: state => state.success,
      validationErrors: state => state.validationErrors,
      dataSet: state => state.dataSet,
      dataSetTotal: state => state.dataSetTotal,
      dataSetLastPage: state => state.dataSetLastPage
    }),

    currentPage() {
      return this.dataTableFilter.page;
    },

    dataTableStats() {
      let fromRecord =
        this.currentPage * this.dataTableFilter.per_page -
        (this.dataTableFilter.per_page - 1);
      let toRecord =
        this.dataSetTotal - this.currentPage * this.dataTableFilter.per_page > 0
          ? this.currentPage * this.dataTableFilter.per_page
          : this.dataSetTotal;
      let ofTotal = this.dataSetTotal;
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
      if (value === true) return "success";
      if (value === false) return "warning";
      return "danger";
    },

    loadRecords() {
      let vm = this;
      this.dataTableFilterPayload = this.dataTableFilter;
      let payload = {
        ...this.dataTableFilterPayload
      };
      vm.$store.dispatch("users/list", payload).then(() => {
        // this.recordsLoading = false;
      });
    }, // loadRecords()

    deleteRecord(id, name = "") {
      this.selectedRecords = [];
      this.$swal
        .fire({
          type: "warning",
          title: `Are you sure you want to delete "${name}"?`,
          text:
            "This action cannot be undone and will permanently delete this record and its associated records.",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-danger mx-2",
            cancelButton: "btn btn-secondary mx-2"
          },
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.$store.dispatch("users/delete", id).then(() => {
              if (
                this.$store.state.users.success !== false &&
                this.$store.state.users.error === false
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
              let msg = this.$store.state.users.success;
              this.$store.commit("users/REMOVE_ERROR_SUCCESS");
              this.selectedRecords = [];
              this.loadRecords();
              this.$swal.fire("", msg, "success");
            } else {
              let msg = this.$store.state.users.error;
              this.$swal.fire("", msg, "error");
            }
          }
        }); // this.$swal.fire({...})
    }, // deleteRecord()

    deleteMultipleRecords() {
      let selectedRecords = this.selectedRecords;
      let selectedIds = [];
      selectedRecords.forEach(function(record, index) {
        selectedIds.push(selectedRecords[index].id);
      });
      let payload = {
        ids: selectedIds
      };
      this.$swal
        .fire({
          type: "warning",
          title: `Are you sure you want to delete "${this.selectedRecords.length} selected records"?`,
          text:
            "This action cannot be undone and will permanently delete this record and its associated records.",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: "Yes, delete selected!",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-danger mx-2",
            cancelButton: "btn btn-secondary mx-2"
          },
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.$store
              .dispatch("users/deleteMultiple", payload)
              .then(() => {
                if (
                  this.$store.state.users.success !== false &&
                  this.$store.state.users.error === false
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
              let msg = this.$store.state.users.success;
              this.$store.commit("users/REMOVE_ERROR_SUCCESS");
              this.loadRecords();
              this.$swal.fire("", msg, "success");
            } else {
              let msg = this.$store.state.users.error;
              this.$swal.fire("", msg, "error");
            }
          }
        }); // this.$swal.fire({...})
    } // deleteRecord()
  }
};
</script>
