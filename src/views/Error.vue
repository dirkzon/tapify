<template>
  <div>
    <h1>{{ error_message }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Error",
  data: () => ({
    error_message: "",
  }),
  mounted() {
    this.error_message = String(this.$route.query.error_message);
  },
});
</script>

<style scoped></style>
