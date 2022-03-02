<template>
  <div style="text-align: center">
    <v-card style="padding: 10px">
      <v-card-title class="text-h5 grey lighten-2">
        Total duration: {{ new Date(totalDuration).getMinutes() }}:{{
          new Date(totalDuration).getSeconds().toString().padStart(2, "0")
        }}
      </v-card-title>
      <v-btn @click="updatePlaylist">
        <v-icon>mdi-playlist-edit</v-icon> update {{ playlist.name }}
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "UploadPopUp",
  computed: {
    totalDuration() {
      return this.$store.getters.getCassetteTotalDuration;
    },
    playlist() {
      return this.$store.getters.getPlaylistData;
    },
  },
  methods: {
    updatePlaylist: function () {
      this.$store.dispatch("updatePlaylist");
    },
  },
});
</script>

<style scoped></style>
