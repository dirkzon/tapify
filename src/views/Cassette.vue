<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Cassette",
  async mounted() {
    await this.$store.dispatch(
      "FillCassette",
      String(this.$route.params.playlist_id)
    );
  },
});
</script>

<style scoped></style>
