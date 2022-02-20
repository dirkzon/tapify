<template>
  <div
    id="grad"
    :style="{
      padding: '0px',
      width: '500px',
      //height: `${track.duration_ms / 2500}px`,
    }"
  >
    <v-row style="margin: 1px" :disabled="track.hidden">
      <v-col md="2">
        <v-card :disabled="track.hidden" tile flat>
          <v-avatar tile style="border-radius: 0; width: 60px; height: auto">
            <v-img :src="track.image"></v-img>
          </v-avatar>
        </v-card>
      </v-col>
      <v-col style="margin: 10px">
        <v-card :disabled="track.hidden" flat>
          <v-row>
            <h4 v-text="track.name" style="margin: 0"></h4>
          </v-row>
          <v-row
            v-for="artist in track.artists"
            :key="artist"
            style="padding: 2px"
          >
            <h6>{{ artist }};</h6>
          </v-row>
        </v-card>
      </v-col>
      <v-col md="1">
        <v-btn class="v-icon" icon small @click="hideTrack">
          <v-icon small v-if="!track.hidden">mdi-delete</v-icon>
          <v-icon small v-else>mdi-undo</v-icon>
        </v-btn>
        <v-btn
          :disabled="track.hidden"
          class="v-icon"
          icon
          small
          @click="lockTrack"
        >
          <v-icon small v-if="!track.locked">mdi-lock-open</v-icon>
          <v-icon small v-else>mdi-lock</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TrackItem",
  props: ["track"],
  methods: {
    lockTrack() {
      this.$store.dispatch("setTrackLocked", this.track.id);
    },
    hideTrack() {
      this.$store.dispatch("SetTrackHidden", this.track.id);
    },
  },
});
</script>

<style scoped>
#grad {
  background: linear-gradient(to right, #1db954 0%, transparent 0%);
}
</style>
