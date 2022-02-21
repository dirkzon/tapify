<template>
  <div data-app>
    <v-card style="width: fit-content; padding: 20px">
      <v-row>
        <v-col>
          <v-select
            outlined
            :items="lengths"
            label="Cassette length"
            style="width: 300px"
            v-model="cassetteLength"
            value="60"
          ></v-select
        ></v-col>
        <v-col>
          <div style="padding: 5px">
            <v-btn
              title="Unlock all tracks"
              class="v-icon"
              outlined
              fab
              small
              @click="unlockAll"
              style="margin: 5px"
            >
              <v-icon>mdi-lock-open</v-icon>
            </v-btn>
            <v-btn
              title="Unhide all tracks"
              class="v-icon"
              outlined
              fab
              small
              @click="showAll"
              style="margin: 5px"
            >
              <v-icon>mdi-undo</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-card style="margin: 20px" flat>
          <v-card-title
            :style="{
              color: this.a_side.exceeds_duration ? 'red' : '',
            }"
          >
            {{ new Date(this.a_side.total_duration).getMinutes() }}:{{
              new Date(this.a_side.total_duration).getSeconds()
            }}
          </v-card-title>
          <v-card-subtitle>A-side</v-card-subtitle>
          <v-divider></v-divider>
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
          <v-skeleton-loader
            v-if="loading"
            width="500px"
            type="list-item-avatar-two-line"
          >
          </v-skeleton-loader>
        </v-card>
        <v-divider vertical></v-divider>
        <v-card style="margin: 20px" flat>
          <v-card-title
            :style="{
              color: this.b_side.exceeds_duration ? 'red' : '',
            }"
          >
            {{ new Date(this.b_side.total_duration).getMinutes() }}:{{
              new Date(this.b_side.total_duration).getSeconds()
            }}
          </v-card-title>
          <v-card-subtitle>B-side</v-card-subtitle>
          <v-divider></v-divider>
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

          <v-skeleton-loader
            v-if="loading"
            width="500px"
            type="list-item-avatar-two-line"
          >
          </v-skeleton-loader>
        </v-card>
      </v-row>
    </v-card>
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
      loading: true,
    };
  },

  async mounted() {
    await this.$store.dispatch("FillCassette", this.$route.params.playlist_id);
    this.loading = false;
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
    cassetteLength: {
      get() {
        return this.$store.getters.getMaxDuration / 60000;
      },
      set(value) {
        this.$store.dispatch("setMaxDuration", value);
      },
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
    unlockAll: function () {
      this.$store.dispatch("unlockAllTracks");
    },
    showAll: function () {
      this.$store.dispatch("showAllTracks");
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
