<template>
  <vx-card no-shadow>
    <b-row class="mb-10">
      <b-col lg="6">
        <h4>Link Accounts</h4>
        <hr />
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="6">
        <b-row class="mb-10">
          <b-col cols="1">
            <b-img-lazy
              src="@/assets/images/icons/brands-icon-google.png"
              alt="Google"
              width="32"
            ></b-img-lazy>
          </b-col>
          <b-col cols="7">
            Google
          </b-col>
          <b-col cols="4">
            <a href="#">Link Account</a>
          </b-col>
        </b-row>

        <b-row class="mb-10">
          <b-col cols="1">
            <b-img-lazy
              src="@/assets/images/icons/brands-icon-linkedin.png"
              alt="LinkedIn"
              width="32"
            ></b-img-lazy>
          </b-col>
          <b-col cols="7">
            LinkedIn
          </b-col>
          <b-col cols="4">
            <a href="#">Link Account</a>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </vx-card>
</template>

<script>
export default {};
</script>
