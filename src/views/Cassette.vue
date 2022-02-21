<template>
  <div>
    <v-row>
      <v-card style="margin: 20px">
        <v-card-title
          :style="{
            color: this.a_side.exceeds_duration ? 'red' : 'black',
          }"
        >
          {{ new Date(this.a_side.total_duration).getMinutes() }}:{{
            new Date(this.a_side.total_duration).getSeconds()
          }}
        </v-card-title>
        <draggable
          group="tracks"
          v-model="a_side_tracks"
          class="list-group"
          @change="setLock"
        >
          <v-col
            style="padding: 2px"
            class="list-group-item"
            :key="track.id"
            v-for="track in a_side_tracks"
          >
            <TrackItem v-bind:track="track"></TrackItem>
            <v-divider></v-divider>
          </v-col>
        </draggable>
      </v-card>
      <v-card style="margin: 20px">
        <v-card-title
          :style="{
            color: this.b_side.exceeds_duration ? 'red' : 'black',
          }"
        >
          {{ new Date(this.b_side.total_duration).getMinutes() }}:{{
            new Date(this.b_side.total_duration).getSeconds()
          }}
        </v-card-title>
        <draggable
          group="tracks"
          v-model="b_side_tracks"
          class="list-group"
          @change="setLock"
        >
          <v-col
            style="padding: 2px"
            class="list-group-item"
            :key="track.id"
            v-for="track in b_side_tracks"
          >
            <TrackItem v-bind:track="track"></TrackItem>
            <v-divider></v-divider>
          </v-col>
        </draggable>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TrackItem from "@/components/TrackItem.vue";
import draggable from "vuedraggable";

export default Vue.extend({
  name: "Cassette",
  components: {
    TrackItem,
    draggable,
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
    b_side_tracks: {
      get() {
        return this.$store.getters.getCassetteState.b_side.tracks;
      },
      set(value: any) {
        this.$store.dispatch("moveTrack", { side: "b", tracks: value });
      },
    },
    a_side_tracks: {
      get() {
        return this.$store.getters.getCassetteState.a_side.tracks;
      },
      set(value: any) {
        this.$store.dispatch("moveTrack", { side: "a", tracks: value });
      },
    },
    a_side() {
      return this.$store.getters.getCassetteState.a_side;
    },
    b_side() {
      return this.$store.getters.getCassetteState.b_side;
    },
    totalDuration() {
      return this.$store.getters.getTotalCassetteDuration;
    },
  },
  methods: {
    setLock: function (value: any) {
      if (value.added) {
        this.$store.dispatch("setTrackLocked", {
          id: value.added.element.id,
          locked: true,
        });
      }
      if (value.moved) {
        this.$store.dispatch("setTrackLocked", {
          id: value.moved.element.id,
          locked: true,
        });
      }
      if (value.removed) {
        this.$store.dispatch("setTrackLocked", {
          id: value.removed.element.id,
          locked: true,
        });
      }
    },
  },
});
</script>

<style scoped></style>

<!--        <v-card-title-->
<!--          :style="{-->
<!--            color: this.sides[1].exceeds_duration ? 'red' : 'black',-->
<!--          }"-->
<!--        >-->
<!--          {{ new Date(this.sides[1].total_duration).getMinutes() }}:{{-->
<!--            new Date(this.sides[1].total_duration).getSeconds()-->
<!--          }}-->
<!--        </v-card-title>-->
