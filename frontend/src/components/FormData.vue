<template>
  <div class="container">
    <div class="main-form-container">
      <div class="p-3 form-container">
        <!-- json form -->
        <vue-form-generator :schema="schema" :model="model">
        </vue-form-generator>
        <b-button @click="uploadDataToServer" variant="outline-primary"
          >Submit</b-button
        >
      </div>
    </div>
  </div>
</template>
   
<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import fileds from "./fields.json";
import axios from "axios";

Vue.use(VueFormGenerator);

export default {
  data() {
    return {
      model: {},
      schema: fileds,
    };
  },
  methods: {
    /**
     * This method is responsible to upload data to server
     */
    uploadDataToServer() {
      // Send data to server
      axios
        .post("http://localhost:3000/api/insert-json", this.model)
        .then(() => {
          this.makeToast("Success", "success", "Data uploaded successfully");
        })
        .catch(() => {
          this.makeToast("Error!", "danger", "Something went wrong");
        });
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
<style scoped>
.container {
  height: 100vh;
}
.main-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.form-container {
  width: 50%;
  box-shadow: #0d55f057 0px 10px 20px, rgb(0 0 0 / 23%) 0px 6px 6px;
  border-radius: 5px;
}
</style>