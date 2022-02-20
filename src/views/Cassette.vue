<template>
  <div>
    <v-row>
      <v-card style="margin: 20px">
        <v-card-title
          :style="{
            color: this.sides[0].exceeds_duration ? 'red' : 'black',
          }"
        >
          {{ new Date(this.sides[0].total_duration).getMinutes() }}:{{
            new Date(this.sides[0].total_duration).getSeconds()
          }}
        </v-card-title>
        <v-col
          v-for="track in this.sides[0].tracks"
          :key="track.id"
          style="padding: 2px"
        >
          <TrackItem v-bind:track="track"></TrackItem>
          <v-divider></v-divider>
        </v-col>
      </v-card>
      <v-card style="margin: 20px">
        <v-card-title
          :style="{
            color: this.sides[1].exceeds_duration ? 'red' : 'black',
          }"
        >
          {{ new Date(this.sides[1].total_duration).getMinutes() }}:{{
            new Date(this.sides[1].total_duration).getSeconds()
          }}
        </v-card-title>
        <v-col
          v-for="track in this.sides[1].tracks"
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
  data() {
    return {
      lengths: ["60", "90", "120"],
    };
  },

  async mounted() {
    await this.$store.dispatch("FillCassette", this.$route.params.playlist_id);
  },
  computed: {
    sides() {
      return this.$store.getters.getCassetteSides;
    },
    totalDuration() {
      return this.$store.getters.getTotalCassetteDuration;
    },
  },
});
</script>

<style scoped></style>
