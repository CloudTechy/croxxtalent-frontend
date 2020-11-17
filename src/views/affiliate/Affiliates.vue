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
      :data="affiliatesDataSet"
      :total="affiliatesDataSetTotal"
      search
      :no-data-text="
        loadingAffiliatesDataSet
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
        <vs-th sort-key="created_at">Registered</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <b-overlay
            :show="loadingAffiliatesDataSet"
            rounded="sm"
            opacity="0.7"
            no-wrap
            style="min-height: 11rem;"
          >
          </b-overlay>
          <vs-tr v-for="(cv, index) in data" :key="index" :data="cv">
            <vs-td>
              <p class="item-name font-medium truncate">
                <!-- {{ cv.title.toUpperCase() }} -->
                {{ $_toTitleCase(cv.name) }}
              </p>
            </vs-td>
            <vs-td>
              <p class="font-medium">
                {{ cv.email }}
              </p>
            </vs-td>
            <vs-td>
              <p class="font-medium">
                {{ cv.phone }}
              </p>
            </vs-td>
            <vs-td>
              <p class="font-medium">
                {{ cv.job_title_name }}
              </p>
            </vs-td>
            <vs-td>
              <p class="font-medium">
                {{ cv.created_at | moment("MMM D, YYYY h:mm A") }}
              </p>
            </vs-td>
            <vs-td class="whitespace-no-wrap">
              <b-button
                v-b-tooltip.hover
                title="Download CV"
                variant="outline-secondary"
                @click="downloadCv(cv)"
              >
                <feather-icon icon="DownloadIcon" class="" />
              </b-button>
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <vs-pagination
      v-show="affiliatesDataSetLastPage > 1"
      v-model="dataTableFilter.page"
      :total="affiliatesDataSetLastPage"
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
      loadingAffiliatesDataSet: state => state.loadingAffiliatesDataSet,
      error: state => state.error,
      success: state => state.success,
      validationErrors: state => state.validationErrors,
      affiliatesDataSet: state => state.affiliatesDataSet,
      affiliatesDataSetTotal: state => state.affiliatesDataSetTotal,
      affiliatesDataSetLastPage: state => state.affiliatesDataSetLastPage
    }),

    currentPage() {
      return this.dataTableFilter.page;
    },

    dataTableStats() {
      let fromRecord =
        this.currentPage * this.dataTableFilter.per_page -
        (this.dataTableFilter.per_page - 1);
      let toRecord =
        this.affiliatesDataSetTotal -
          this.currentPage * this.dataTableFilter.per_page >
        0
          ? this.currentPage * this.dataTableFilter.per_page
          : this.affiliatesDataSetTotal;
      let ofTotal = this.affiliatesDataSetTotal;
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

    getPublishedStatusColor(value) {
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
      vm.$store
        .dispatch("users/affiliates", {
          id: this.$store.state.auth.user.id,
          payload: payload
        })
        .then(() => {
          // this.recordsLoading = false;
        });
    }, // loadRecords()

    downloadCv(cvData) {
      if (cvData.pdf_download_url) {
        window.open(cvData.pdf_download_url, "_blank");
        // win.focus();
      }
    }
  }
};
</script>
