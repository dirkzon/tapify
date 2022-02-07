<template>
  <div
    id="grad"
    :style="{
      padding: '0px',
      width: '500px',
      height: `${track.duration_ms / 2500}px`,
    }"
  >
    <v-row style="margin: 1px">
      <v-col md="2">
        <v-avatar tile style="border-radius: 0; width: 60px; height: auto">
          <v-img :src="track.image"></v-img>
        </v-avatar>
      </v-col>
      <v-col style="margin: 10px">
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
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TrackItem",
  props: ["track"],
  mounted() {
    console.log(this.track.duration_ms);
  },
});
</script>

<style scoped>
#grad {
  background: linear-gradient(to right, #1db954 0%, transparent 0%);
}
</style>
