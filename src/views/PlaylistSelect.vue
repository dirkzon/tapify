<template>
  <div>
    <h1>bruh</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "PlaylistSelect",
  async mounted() {
    console.log(await this.$store.getters.getUsersPlaylists);
  },
});
</script>

<style scoped></style>
