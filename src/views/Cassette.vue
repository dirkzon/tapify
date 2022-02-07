<template>
  <div>
    <v-row>
      <v-card style="margin: 20px">
        <v-col v-for="track in a_side" :key="track.id" style="padding: 2px">
          <TrackItem v-bind:track="track"></TrackItem>
          <v-divider></v-divider>
        </v-col>
        <v-card-title
          >{{ Math.floor((a_duration / 1000 / 60) % 60) }}:
          {{
            Math.floor((a_duration / 1000) % 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
            })
          }}
        </v-card-title>
      </v-card>
      <v-card style="margin: 20px">
        <v-col v-for="track in b_side" :key="track.id" style="padding: 2px">
          <TrackItem v-bind:track="track"></TrackItem>
          <v-divider></v-divider>
        </v-col>
        <v-card-title
          >{{ Math.floor((b_duration / 1000 / 60) % 60) }}:
          {{
            Math.floor((b_duration / 1000) % 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
            })
          }}
        </v-card-title>
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
  data: function () {
    return {
      a_side: [],
      b_side: [],
      a_duration: 0,
      b_duration: 0,
    };
  },
  methods: {
    getTotalDuration(tracks: any): number {
      let output = 0;
      tracks.forEach((t: any) => {
        output += t.duration_ms;
      });
      return output;
    },
  },
  async mounted() {
    await this.$store.dispatch(
      "FillCassette",
      String(this.$route.params.playlist_id)
    );
    const sides = await this.$store.getters.getCassetteSides;
    this.a_side = sides[0];
    this.b_side = sides[1];
    this.a_duration = this.getTotalDuration(this.a_side);
    this.b_duration = this.getTotalDuration(this.b_side);
  },
});
</script>

<style scoped></style>
