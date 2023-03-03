<template>
  <div id="app">
    <form-view />
  </div>
</template>

<script>
import FormView from "./views/FormView.vue";
export default {
  name: "App",
  components: {
    FormView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
