<template>
  <div class="callback"></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "callback",
  async mounted() {
    await this.$store
      .dispatch("Authorize", { code: this.$route.query.code })
      .catch((err) => {
        console.log(err);
        this.$router.push({
          path: "/Error",
          query: {
            error_message: `Authorization failed: "${err}"`,
          },
        });
      });
    await this.$store.dispatch("FetchUserProfile");
    await this.$router.push("PlaylistSelect");
  },
});
</script>
