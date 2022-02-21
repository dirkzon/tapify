<template>
  <div>
    <v-card style="width: fit-content; padding: 20px">
      <v-skeleton-loader
        v-if="loading"
        width="500px"
        height="150px"
        type="list-item-avatar-two-line"
      >
      </v-skeleton-loader>
      <v-row v-for="item in playlists" :key="item.uri" style="margin: 20px">
        <PlaylistThumbnail v-bind:playlist="item"></PlaylistThumbnail>
      </v-row>
    </v-card>
  </div>
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
      loading: true,
    };
  },
  async mounted() {
    this.playlists = await this.$store.getters.getUsersPlaylists;
    this.loading = false;
  },
});
</script>

<style scoped></style>
