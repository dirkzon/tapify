<template>
  <v-container fill-height fluid>
    <v-row
      v-for="item in playlists"
      :key="item.uri"
      justify="center"
      align="center"
    >
      <PlaylistThumbnail v-bind:playlist="item"></PlaylistThumbnail>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import PlaylistThumbnail from "@/components/PlaylistThumbnail.vue";
export default Vue.extend({
  name: "PlaylistSelect",
  components: {
    PlaylistThumbnail,
  },
  data: function () {
    return {
      playlists: [],
    };
  },
  async mounted() {
    this.playlists = await this.$store.getters.getUsersPlaylists;
  },
});
</script>

<style scoped></style>
