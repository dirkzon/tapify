<template>
  <div>
    <v-card style="margin: 20px" flat>
      <v-card-title>
        {{ new Date(this.duration).getMinutes() }}:{{
          new Date(this.duration).getSeconds().toString().padStart(2, "0")
        }}
      </v-card-title>
      <v-card-subtitle
        >{{ String.fromCharCode(97 + index) }}-side</v-card-subtitle
      >
      <v-divider></v-divider>
      <draggable
        @change="setLock"
        group="tracks"
        v-model="tracks"
        class="list-group"
      >
        <v-col
          style="padding: 2px"
          class="list-group-item"
          :key="track.id"
          v-for="track in tracks"
        >
          <TrackItem v-bind:track="track"></TrackItem>
          <v-divider></v-divider>
        </v-col>
      </draggable>
      <v-skeleton-loader
        v-if="tracks.length === 0"
        width="500px"
        type="list-item-avatar-two-line"
      >
      </v-skeleton-loader>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import draggable from "vuedraggable";
import TrackItem from "@/components/TrackItem.vue";

export default Vue.extend({
  name: "CassetteSide",
  components: {
    draggable,
    TrackItem,
  },
  props: ["index"],
  computed: {
    tracks: {
      get() {
        return this.$store.getters.getCassetteSideTracks(this.index).tracks;
      },
      set(value) {
        console.log(value);
        return this.$store.dispatch("moveTrack", {
          index: this.index,
          tracks: value,
        });
      },
    },
    duration() {
      return this.$store.getters.getCassetteSideDuration(this.index);
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
