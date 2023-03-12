<template>
  <div class="container">
    <div class="main-form-container">
      <div class="p-3 form-container">
        <!-- json form -->
        <vue-form-generator :schema="schema" :model="model">
        </vue-form-generator>
        <b-button @click="uploadDataToServer" variant="outline-primary" :disabled="isDataUploading">
          <!-- <span class="d-flex" v-if="isDataUploading"><b-spinner  small type="grow"></b-spinner>
            Uploading...</span> -->
            <b-spinner v-if="isDataUploading" large></b-spinner>
          <span v-else>Submit</span></b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import fileds from "./fields.js";
import axios from "axios";

Vue.use(VueFormGenerator);

export default {
  data() {
    return {
      model: {},
      schema: fileds,
      isDataUploading: false,
    };
  },
  methods: {
    /**
     * This method is responsible to upload data to server
     */
    uploadDataToServer() {
      this.isDataUploading = true;
      // Send data to server
      axios
        .post("http://localhost:3000/api/insert-json", this.model)
        .then(() => {
          this.makeToast("Success", "success", "Data uploaded successfully");
        })
        .catch(() => {
          this.makeToast("Error!", "danger", "Something went wrong");
        }).finally(() => {
          this.isDataUploading = false;
        })
    },
    makeToast(title, variant = null, message) {
      this.$bvToast.toast(message, {
        title,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>