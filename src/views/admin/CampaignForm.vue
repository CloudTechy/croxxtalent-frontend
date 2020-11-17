<template>
  <vx-card no-shadow>
    <b-overlay
      :show="!recordLoaded"
      rounded="sm"
      opacity="0.7"
      no-wrap
      style="min-height: 11rem;"
    >
    </b-overlay>
    <b-row class="mb-10">
      <b-col cols="12">
        <h4 v-show="!form.editMode">New Campaign</h4>
        <h4 v-show="form.editMode">Editing: {{ form.editModeTitle }}</h4>
        <hr />
      </b-col>
    </b-row>
    <!-- PROFILE UPDATE FROM FIELDS -->
    <b-col>
      <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
        <form
          class=""
          @submit.prevent="
            form.editMode
              ? handleSubmit(updateRecord)
              : handleSubmit(createRecord)
          "
        >
          <b-row>
            <b-col>
              <!-- Title field -->
              <validation-provider
                v-slot="validationContext"
                vid="title"
                name="Title"
                rules="required|max:100"
              >
                <b-form-group
                  label="Title"
                  label-for="input-title"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <b-form-input
                    id="input-title"
                    v-model.trim="form.title"
                    class="custom-input"
                    type="text"
                    placeholder="Title"
                    maxlength="100"
                    autocomplete="off"
                    :state="$_getFormValidationState(validationContext)"
                    trim
                    size="lg"
                  ></b-form-input>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <!-- Industry, Job Title and Work Type field -->
          <b-row>
            <b-col md="4">
              <!-- Industry field -->
              <validation-provider
                v-slot="validationContext"
                vid="industry_id"
                name="Industry"
                rules="required"
              >
                <b-form-group
                  label="Industry"
                  label-for="input-industry"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="select-input-industry"
                    v-model.trim="form.industry_id"
                    class="v-select custom-input000"
                    placeholder="Industry"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="Object.values($store.state.industries.dataSet)"
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span v-if="$store.state.industries.loadingDataSet">
                        Loading data, please wait.
                      </span>
                      <span v-else>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-industry"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="4">
              <!-- Job Title field -->
              <validation-provider
                v-slot="validationContext"
                vid="job_title_id"
                name="Job Title"
                rules="required"
              >
                <b-form-group
                  label="Job Title"
                  label-for="input-job_title_id"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="select-input-job_title_id"
                    v-model.trim="form.job_title_id"
                    class="v-select custom-input000"
                    placeholder="Job Title"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="Object.values($store.state.jobTitles.dataSet)"
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span v-if="$store.state.jobTitles.loadingDataSet">
                        Loading data, please wait.
                      </span>
                      <span v-else>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-job_title_id"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="4">
              <!-- Work Type field -->
              <validation-provider
                v-slot="validationContext"
                vid="work_type"
                name="Work Type"
                rules="required"
              >
                <b-form-group
                  label="Work Type"
                  label-for="input-work-type"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="select-input-work-type"
                    v-model.trim="form.work_type"
                    class="v-select custom-input000"
                    placeholder="Work Type"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="Object.values($_workTypeDataSet())"
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-work-type"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <!-- Skills, Courses Of Study and Languages field -->
          <b-row>
            <b-col md="4">
              <!-- Skills field -->
              <validation-provider
                v-slot="validationContext"
                vid="skill_ids"
                name="Skills"
                rules="required"
              >
                <b-form-group
                  label="Skills"
                  label-for="input-skill"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="select-input-skill"
                    v-model.trim="form.skill_ids"
                    multiple
                    class="v-select custom-input000"
                    placeholder="Skills"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="Object.values($store.state.skills.dataSet)"
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span v-if="$store.state.skills.loadingDataSet">
                        Loading data, please wait.
                      </span>
                      <span v-else>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-skill"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="4">
              <!-- Courses of Study field -->
              <validation-provider
                v-slot="validationContext"
                vid="course_of_study_ids"
                name="Course of Study"
                rules="required"
              >
                <b-form-group
                  label="Course of Study"
                  label-for="input-course_of_study_ids"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="select-input-course_of_study_ids"
                    v-model.trim="form.course_of_study_ids"
                    multiple
                    class="v-select custom-input000"
                    placeholder="Course of Study"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="
                      Object.values($store.state.courseOfStudies.dataSet)
                    "
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span v-if="$store.state.courseOfStudies.loadingDataSet">
                        Loading data, please wait.
                      </span>
                      <span v-else>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-course_of_study_ids"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="4">
              <!-- Languages field -->
              <validation-provider
                v-slot="validationContext"
                vid="language_ids"
                name="Language"
                rules="required"
              >
                <b-form-group
                  label="Language"
                  label-for="input-language_ids"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="select-input-language_ids"
                    v-model.trim="form.language_ids"
                    multiple
                    class="v-select custom-input000"
                    placeholder="Language"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="Object.values($store.state.languages.dataSet)"
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span v-if="$store.state.languages.loadingDataSet">
                        Loading data, please wait.
                      </span>
                      <span v-else>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-language_ids"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <!-- Qualification, Salary Currency and Min Salary, Max Salary field -->
          <b-row>
            <b-col md="4">
              <!-- Qualification field -->
              <validation-provider
                v-slot="validationContext"
                vid="degree_id"
                name="Minimum Degree/Qualification"
                rules="required"
              >
                <b-form-group
                  label="Minimum Degree/Qualification"
                  label-for="input-degree"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="select-input-industry"
                    v-model.trim="form.minimum_degree_id"
                    class="v-select custom-input000"
                    placeholder="Minimum Degree/Qualification"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="Object.values($store.state.degrees.dataSet)"
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span v-if="$store.state.degrees.loadingDataSet">
                        Loading data, please wait.
                      </span>
                      <span v-else>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-degree"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="4">
              <!-- Salary Currency field -->
              <validation-provider
                v-slot="validationContext"
                vid="currency_code"
                name="Salary Currency"
                rules=""
              >
                <b-form-group
                  label="Salary Currency"
                  label-for="input-currency-code"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="select-input-currency-code"
                    v-model.trim="form.currency_code"
                    class="v-select custom-input000"
                    placeholder="Salary Currency"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="Object.values($_currencyDataSet())"
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-currency-code"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="4">
              <b-row>
                <b-col md="6">
                  <!-- Minimum Salary field -->
                  <validation-provider
                    v-slot="validationContext"
                    vid="min_salary"
                    name="Minimum Salary"
                    rules="max:26"
                  >
                    <b-form-group
                      label="Minimum Salary"
                      label-for="input-min_salary"
                      description=""
                      :invalid-feedback="validationContext.errors[0]"
                      valid-feedback=""
                      :state="$_getFormValidationState(validationContext)"
                    >
                      <cleave
                        id="input-min_salary"
                        v-model.trim="form.min_salary"
                        class="form-control form-control-lg custom-input"
                        type="text"
                        placeholder="1,000"
                        autocomplete="off"
                        :state="$_getFormValidationState(validationContext)"
                        :options="amountCleaveOptions"
                        maxlength="26"
                      ></cleave>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col md="6">
                  <!-- Maximum Salary field -->
                  <validation-provider
                    v-slot="validationContext"
                    vid="max_salary"
                    name="Maximum Salary"
                    rules="max:26"
                  >
                    <b-form-group
                      label="Maximum Salary"
                      label-for="input-max_salary"
                      label-class=""
                      description=""
                      :invalid-feedback="validationContext.errors[0]"
                      valid-feedback=""
                      :state="$_getFormValidationState(validationContext)"
                    >
                      <cleave
                        id="input-max_salary"
                        v-model.trim="form.max_salary"
                        class="form-control form-control-lg custom-input"
                        type="text"
                        placeholder="1,000"
                        autocomplete="off"
                        :state="$_getFormValidationState(validationContext)"
                        :options="amountCleaveOptions"
                        maxlength="26"
                      ></cleave>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
              <!--  Salary Is Confidential fields -->
              <div class="center content-inputs">
                <b-form-checkbox
                  v-model="form.is_confidential_salary"
                  :value="true"
                  :unchecked-value="false"
                  size="md"
                  class="mb-5"
                >
                  Salary is confidential
                </b-form-checkbox>
              </div>
            </b-col>
          </b-row>

          <!-- Experience, Available Openings and Deadline field -->
          <b-row>
            <b-col md="4">
              <!-- Experience field -->
              <validation-provider
                v-slot="validationContext"
                vid="years_of_experience"
                name="Experience"
                rules="required"
              >
                <b-form-group
                  label="Experience"
                  label-for="input-years_of_experience"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="select-input-years_of_experience"
                    v-model.trim="form.years_of_experience"
                    class="v-select custom-input000"
                    placeholder="Experience"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="Object.values($_yearsOfExperienceDataSet())"
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-years_of_experience"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="4">
              <!-- Available Openings field -->
              <validation-provider
                v-slot="validationContext"
                vid="years_of_experience"
                name="Available Openings"
                rules="required"
              >
                <b-form-group
                  label="Available Openings"
                  label-for="input-number_of_positions"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="select-input-number_of_positions"
                    v-model.trim="form.number_of_positions"
                    class="v-select custom-input000"
                    placeholder="Available Openings"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="Object.values($_numberOfPositionsDataSet())"
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-number_of_positions"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="4">
              <!-- Expiration Date field -->
              <validation-provider
                v-slot="validationContext"
                vid="expire_at"
                name="Deadline / Expiration Date"
                rules="required"
              >
                <b-form-group
                  label="Deadline / Expiration Date"
                  label-for="input-expire_at"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <datepicker
                    id="input-expire_at"
                    v-model.trim="form.expire_at"
                    type="datetime"
                    input-class="custom-input p-4"
                    placeholder="Deadline / Expiration Date"
                    autocomplete="off"
                    :state="$_getFormValidationState(validationContext)"
                    typeable
                    bootstrap-styling
                    required
                  ></datepicker>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <!-- Country, State and City field -->
          <b-row>
            <b-col md="4">
              <!-- Country field -->
              <validation-provider
                v-slot="validationContext"
                vid="country_code"
                name="Country"
                rules="required"
              >
                <b-form-group
                  label="Country"
                  label-for="input-country"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="input-country"
                    v-model.trim="form.country_code"
                    class="v-select custom-input000"
                    placeholder="Country"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="Object.values($store.state.countries.dataSet)"
                    label="name"
                    :reduce="option => option.code"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span v-if="$store.state.countries.loadingDataSet">
                        Loading data, please wait.
                      </span>
                      <span v-else>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="country_code"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="4">
              <!-- State field -->
              <validation-provider
                v-slot="validationContext"
                vid="state_id"
                name="State"
                rules="required"
              >
                <b-form-group
                  label="State"
                  label-for="input-state"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="input-state"
                    v-model.trim="form.state_id"
                    class="v-select custom-input000"
                    placeholder="State"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="
                      Object.values($store.state.countries.statesDataSet)
                    "
                    label="name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span v-if="$store.state.countries.loadingStatesDataSet">
                        Loading data, please wait.
                      </span>
                      <span v-else>
                        Sorry, no matching options. You may need to select a
                        country to load the state data.
                      </span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="state_id"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="4">
              <!-- City field -->
              <validation-provider
                v-slot="validationContext"
                vid="city"
                name="City"
                rules="required|max:255"
              >
                <b-form-group
                  label="City"
                  label-for="input-city"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <b-form-input
                    id="input-city"
                    v-model.trim="form.city"
                    class="custom-input"
                    type="text"
                    placeholder="City"
                    maxlength="255"
                    autocomplete="off"
                    :state="$_getFormValidationState(validationContext)"
                    trim
                    size="lg"
                  ></b-form-input>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <!-- Summary field -->
              <validation-provider
                v-slot="validationContext"
                vid="summary"
                name="Summary"
                rules="required|max:500"
              >
                <b-form-group
                  label="Summary"
                  label-for="input-summary"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <b-form-textarea
                    id="input-summary"
                    v-model.trim="form.summary"
                    class="custom-input"
                    placeholder="Summary"
                    maxlength="500"
                    rows="3"
                    :state="$_getFormValidationState(validationContext)"
                    trim
                    size="lg"
                  ></b-form-textarea>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <!-- Description field -->
              <validation-provider
                v-slot="validationContext"
                vid="description"
                name="Description"
                rules=""
              >
                <b-form-group
                  label="Description"
                  label-for="input-description"
                  label-class=""
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <vue-editor
                    id="input-description"
                    v-model.trim="form.description"
                    class="custom-input"
                    placeholder="Provide more details here..."
                    maxlength="500"
                    rows="3"
                    :state="$_getFormValidationState(validationContext)"
                    :editor-toolbar="editorToolbar"
                    trim
                    size="lg"
                  />
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <hr />

          <b-row>
            <b-col>
              <!--  Is Managed fields -->
              <div class="center content-inputs">
                <b-form-checkbox
                  v-model="form.is_managed"
                  :value="true"
                  :unchecked-value="false"
                  size="md"
                  class="mb-5"
                >
                  Allow Croxx Talent to help me recruit and manage my workforce.
                </b-form-checkbox>
              </div>
            </b-col>
          </b-row>

          <hr />

          <b-row>
            <b-col>
              <!-- Employer User field -->
              <validation-provider
                v-slot="validationContext"
                vid="user_id"
                name="Employer/Campaign Owner"
                rules="required"
              >
                <b-form-group
                  label="Employer/Campaign Owner"
                  label-for="input-user_id"
                  label-class="required"
                  description=""
                  :invalid-feedback="validationContext.errors[0]"
                  valid-feedback=""
                  :state="$_getFormValidationState(validationContext)"
                >
                  <v-select
                    id="select-input-user_id"
                    v-model.trim="form.user_id"
                    class="v-select custom-input000"
                    placeholder="Employer/Campaign Owner"
                    autocomplete="off"
                    :class="{ 'is-invalid': validationContext.errors[0] }"
                    :options="Object.values($store.state.users.dataSet)"
                    label="display_name"
                    :reduce="option => option.id"
                    append-to-body
                    :calculate-position="withPopper"
                  >
                    <template v-slot:no-options>
                      <span v-if="$store.state.users.loadingDataSet">
                        Loading data, please wait.
                      </span>
                      <span v-else>Sorry, no matching options.</span>
                    </template>
                    <template v-slot:option="option">
                      {{ option.display_name }} | {{ option.email }}
                    </template>
                    <template v-slot:search="{ attributes, events }">
                      <input
                        id="input-user_id"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <!-- Buttons -->
          <div class="items-left justify-end">
            <vs-button
              v-if="form.editMode"
              class="ml-auto mt-2"
              button="submit"
            >
              Save Changes
            </vs-button>
            <vs-button v-else class="ml-auto mt-2" button="submit">
              Create Campaign
            </vs-button>
          </div>
        </form>
      </validation-observer>
    </b-col>
  </vx-card>
</template>

<style lang="scss" scoped>
//
</style>
<script>
import { mapState } from "vuex";
import _ from "lodash";
import myMixins from "../../mixins/myMixins.js";
import Datepicker from "vuejs-datepicker";

import Vue from "vue";
import VueTelInput from "vue-tel-input";

Vue.use(VueTelInput, {
  dynamicPlaceholder: true,
  mode: "international"
});

export default {
  components: {
    Datepicker
  },

  mixins: [myMixins],

  data() {
    return {
      recordLoaded: false,
      form: {
        show: false,
        editMode: false,
        editModeTitle: null,
        id: null,
        user_id: null,
        title: null,
        industry_id: null,
        job_title_id: null,
        work_type: null,
        skill_ids: null,
        course_of_study_ids: null,
        language_ids: null,
        minimum_degree_id: null,
        years_of_experience: null,
        number_of_positions: null,
        is_confidential_salary: false,
        currency_code: null,
        min_salary: null,
        max_salary: null,
        country_code: null,
        state_id: null,
        city: null,
        summary: null,
        description: null,
        photo: null,
        expire_at: null,
        is_managed: false
      },
      amountCleaveOptions: {
        numeral: true,
        numeralThousandsGroupStyle: "thousand"
      },
      // See https://quilljs.com/docs/modules/toolbar/
      editorToolbar: [
        [{ font: [] }],
        [{ size: [] }],
        [{ header: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ script: "sub" }, { script: "super" }],
        [{ color: [] }, { background: [] }],
        ["link", "clean"]
      ]
    };
  },

  computed: {
    ...mapState("campaigns", {
      isLoading: state => state.loading,
      error: state => state.error,
      success: state => state.success,
      validationErrors: state => state.validationErrors,
      data: state => state.data,
      dataSet: state => state.dataSet,
      dataSetTotal: state => state.dataSetTotal
    }),
    formCountryCode: function() {
      return this.form.country_code;
    }
  },

  watch: {
    // eslint-disable-next-line
    dataSet: function(newValue, oldValue) {
      let vm = this;
      setTimeout(() => {
        vm.$store.commit("campaigns/REMOVE_ERROR_SUCCESS");
      }, 10000);
    },

    // Watch and load states for selected country
    formCountryCode: function(newValue, oldValue) {
      if (newValue !== oldValue && oldValue != null) {
        this.form.state_id = null;
      }
      this.$store.commit("countries/SET_STATES_DATASET", {
        data: [],
        total: 0
      });
      if (newValue !== null) {
        this.loadStates();
      }
    }
  },

  // eslint-disable-next-line
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // Switch Form to Edit Mode
      if (vm.$route.params.id) {
        vm.editRecord(vm.$route.params.id);
      } else {
        vm.recordLoaded = true;
      }
    });
  },

  created() {
    this.loadIndustries();
    this.loadJobTitles();
    this.loadSkills();
    this.loadCourseOfStudies();
    this.loadLanguages();
    this.loadDegrees();
    this.loadCountries();
    this.loadEmployers();
  },

  methods: {
    loadIndustries() {
      let vm = this;
      if (
        this.$store.state.industries.dataSet.length <= 0 &&
        this.$store.state.industries.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("industries/list", payload);
      }
    }, // loadIndustries()

    loadJobTitles() {
      let vm = this;
      if (
        this.$store.state.jobTitles.dataSet.length <= 0 &&
        this.$store.state.jobTitles.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("jobTitles/list", payload);
      }
    }, // loadJobTitles()

    loadSkills() {
      let vm = this;
      if (
        this.$store.state.skills.dataSet.length <= 0 &&
        this.$store.state.skills.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("skills/list", payload);
      }
    }, // loadSkills()

    loadCourseOfStudies() {
      let vm = this;
      if (
        this.$store.state.courseOfStudies.dataSet.length <= 0 &&
        this.$store.state.courseOfStudies.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("courseOfStudies/list", payload);
      }
    }, // loadCourseOfStudies()

    loadLanguages() {
      let vm = this;
      if (
        this.$store.state.languages.dataSet.length <= 0 &&
        this.$store.state.languages.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("languages/list", payload);
      }
    }, // loadLanguages()

    loadDegrees() {
      let vm = this;
      if (
        this.$store.state.degrees.dataSet.length <= 0 &&
        this.$store.state.degrees.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("degrees/list", payload);
      }
    }, // loadDegrees()

    loadCountries() {
      let vm = this;
      if (
        this.$store.state.countries.dataSet.length <= 0 &&
        this.$store.state.countries.loadingDataSet !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        vm.$store.dispatch("countries/list", payload);
      }
    }, // loadCountries()

    loadStates() {
      let vm = this;
      let payload = {
        per_page: "all", // -1 or all = all records
        sort_by: "name",
        sort_dir: "asc",
        archived: "no"
      };
      vm.$store.dispatch("countries/states", {
        id: this.form.country_code,
        payload: payload
      });
    }, // loadStates()

    loadEmployers() {
      let vm = this;
      let payload = {
        per_page: "all", // -1 or all = all records
        type: "employer",
        sort_by: "first_name",
        sort_dir: "asc",
        archived: "no"
      };
      vm.$store.dispatch("users/list", payload);
    }, // loadEmployers()

    resetFormData() {
      this.form = {
        show: false,
        editMode: false,
        editModeTitle: null,
        id: null,
        user_id: null,
        title: null,
        industry_id: null,
        job_title_id: null,
        work_type: null,
        skill_ids: null,
        course_of_study_ids: null,
        language_ids: null,
        minimum_degree_id: null,
        years_of_experience: null,
        number_of_positions: null,
        is_confidential_salary: false,
        currency_code: null,
        min_salary: null,
        max_salary: null,
        country_code: null,
        state_id: null,
        city: null,
        summary: null,
        description: null,
        photo: null,
        expire_at: null,
        is_managed: false
      };
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },

    createRecord() {
      let vm = this;
      this.$swal
        .fire({
          type: "warning",
          title: `Create Campaign?`,
          text: "Click Yes to proceed.",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success mx-2",
            cancelButton: "btn btn-secondary mx-2"
          },
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.$store
              .dispatch("campaigns/create", this.form)
              .then(() => {
                if (this.success !== false && this.error === false) {
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
              let msg = this.success;
              this.$swal.fire("", msg, "success").then(function() {
                vm.$router.push({ name: "admin-campaigns" });
                // console.log(vm.success);
              });
            } else {
              this.$refs.form.setErrors(this.validationErrors); // set VeeValidation error
              let msg = this.error;
              this.$swal.fire("", msg, "error");
            }
          }
        }); // this.$swal.fire({...}).then({...})
    },

    editRecord(id) {
      this.$store.dispatch("campaigns/view", id).then(() => {
        if (
          this.success !== false &&
          this.error === false &&
          !_.isEmpty(this.data)
        ) {
          let campaignData = this.data;
          this.form = {
            show: true,
            editMode: true,
            editModeTitle: `${campaignData.title}`,
            id: campaignData.id,
            user_id: campaignData.user_id,
            title: campaignData.title,
            industry_id: campaignData.industry_id,
            job_title_id: campaignData.job_title_id,
            work_type: campaignData.work_type,
            skill_ids: campaignData.skill_ids,
            course_of_study_ids: campaignData.course_of_study_ids,
            language_ids: campaignData.language_ids,
            minimum_degree_id: campaignData.minimum_degree_id,
            years_of_experience: campaignData.years_of_experience,
            number_of_positions: campaignData.number_of_positions,
            is_confidential_salary: campaignData.is_confidential_salary,
            currency_code: campaignData.currency_code,
            min_salary: campaignData.min_salary,
            max_salary: campaignData.max_salary,
            country_code: campaignData.country_code,
            state_id: campaignData.state_id,
            city: campaignData.city,
            summary: campaignData.summary,
            description: campaignData.description,
            photo: campaignData.photo,
            expire_at: campaignData.expire_at,
            is_managed: campaignData.is_managed
          };
          this.recordLoaded = true;
        } else {
          this.$swal.fire({
            toast: true,
            type: "error",
            title: "Record not found.",
            text: "",
            showConfirmButton: false,
            position: "top-end", // bottom-start | top | top-end | center
            background: "#f8d7da", // success:#d4edda | error:#f8d7da | warning:#f9edbe
            timer: 5000
          });
          this.$router.replace({ name: "campaigns" });
        }
      });
    },

    updateRecord() {
      let vm = this;
      this.$swal
        .fire({
          type: "warning",
          title: `Update Campaign?`,
          text: "Click Yes to proceed.",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success mx-2",
            cancelButton: "btn btn-secondary mx-2"
          },
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.$store
              .dispatch("campaigns/update", {
                id: this.data.id,
                payload: this.form
              })
              .then(() => {
                if (this.success !== false && this.error === false) {
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
              let msg = this.success;
              this.$swal.fire("", msg, "success").then(function() {
                vm.$router.push({ name: "admin-campaigns" });
                // console.log(vm.success);
              });
            } else {
              this.$refs.form.setErrors(this.validationErrors); // set VeeValidation error
              let msg = this.error;
              this.$swal.fire("", msg, "error");
            }
          }
        }); // this.$swal.fire({...}).then({...})
    }
  },

  head: {
    title: function() {
      return {
        inner: this.$route.meta.pageTitle
      };
    }
  }
};
</script>
