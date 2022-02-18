<template>
  <div>
    <v-row>
      <v-card style="margin: 20px">
        <v-col
          v-for="track in this.sides[0]"
          :key="track.id"
          style="padding: 2px"
        >
          <TrackItem v-bind:track="track"></TrackItem>
          <v-divider></v-divider>
        </v-col>
      </v-card>
      <v-card style="margin: 20px">
        <v-col
          v-for="track in this.sides[1]"
          :key="track.id"
          style="padding: 2px"
        >
          <TrackItem v-bind:track="track"></TrackItem>
          <v-divider></v-divider>
        </v-col>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TrackItem from "@/components/TrackItem.vue";

export default Vue.extend({
  name: "Cassette",
  components: {
    TrackItem,
  },

  async mounted() {
    await this.$store.dispatch("FillCassette", this.$route.params.playlist_id);
  },
  computed: {
    sides() {
      return this.$store.getters.getCassetteSides;
    },
  },
});
</script>

<style scoped></style>
