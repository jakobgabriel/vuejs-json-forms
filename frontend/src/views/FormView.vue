<template>
  <div>
    <NavbarComponent />
    <!-- data collection form -->
    <form-data />
  </div>
</template>
<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FormData from "@/components/FormData.vue";
export default {
  data() {
    return {};
  },
  components: {
    NavbarComponent,
    FormData,
  },
};
</script>