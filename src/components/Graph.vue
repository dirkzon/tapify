<template>
  <v-card flat width="100%" style="margin: 10px">
    <v-card-subtitle>{{ this.sortKey }}</v-card-subtitle>
    <v-sparkline
      height="30px"
      v-if="graphData.length !== 0"
      :value="graphData"
      :gradient="['#86C6F4']"
      line-width="2"
      smooth="15"
      type="trend"
      auto-draw
    ></v-sparkline>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Graph",
  props: ["tracks", "sortKey"],
  computed: {
    graphData() {
      return this.tracks.filter((t) => !t.hidden).map((t) => t[this.sortKey]);
    },
  },
});
</script>

<style scoped></style>
