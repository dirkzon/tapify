<template>
  <div class="callback"></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "callback",
  async mounted() {
    await this.$store.dispatch("Authorize", { code: this.$route.query.code });
    await this.$store.dispatch("FetchUserProfile");
  },
});
</script>
