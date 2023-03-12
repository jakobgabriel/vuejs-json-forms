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
  created() {
    document.title = 'CollectSphere';
  }
};
</script>
