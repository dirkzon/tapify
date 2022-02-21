<template>
  <v-card
    flat
    style="width: 600px; border-radius: 20px"
    @click="selectPlaylist"
  >
    <v-row style="margin: 1px">
      <v-col md="3">
        <v-avatar tile size="125" style="border-radius: 0">
          <v-img :src="playlist.image"></v-img>
        </v-avatar>
      </v-col>
      <v-col md="8">
        <v-card-title v-text="playlist.name"></v-card-title>
        <v-card-subtitle> {{ playlist.creator }} </v-card-subtitle>
      </v-col>
      <v-col md="1">
        <v-btn class="v-icon" :href="playlist.url" target="_blank" icon small>
          <v-icon small>mdi-open-in-new</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "PlaylistThumbnail",
  props: ["playlist"],
  methods: {
    selectPlaylist() {
      this.$router.push({
        path: "cassette/" + this.playlist.id,
      });
    },
  },
});
</script>

<style scoped></style>
