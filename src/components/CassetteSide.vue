<template>
  <div>
    <v-card style="margin: 20px; width: fit-content" flat outlined>
      <v-row>
        <v-col>
          <v-card-title>
            {{ new Date(this.duration).getMinutes() }}:{{
              new Date(this.duration).getSeconds().toString().padStart(2, "0")
            }}
          </v-card-title>
          <v-card-subtitle
            >{{ String.fromCharCode(97 + index) }}-side</v-card-subtitle
          >
        </v-col>
        <v-col align="right">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                class="v-icon"
                icon
                style="margin: 25px"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-more-vert</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-btn text small @click="unhideSide">
                  <v-icon small>mdi-undo</v-icon> unhide tracks
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn text small @click="lockSide">
                  <v-icon small>mdi-lock</v-icon> lock tracks
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn text small @click="unlockSide">
                  <v-icon small>mdi-lock-open</v-icon> unlock tracks
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn text small @click="deleteSide">
                  <v-icon small>mdi-delete</v-icon> delete side
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>

      <draggable
        @change="setLock"
        group="tracks"
        v-model="tracks"
        class="list-group"
        v-bind="dragOptions"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <v-col
            style="padding: 2px"
            class="list-group-item"
            :key="track.id"
            v-for="track in tracks"
          >
            <TrackItem v-bind:track="track"></TrackItem>
            <v-divider
              style="margin-right: 10px; margin-left: 10px"
            ></v-divider>
          </v-col>
        </transition-group>
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
  data: () => ({
    closeOn: true,
    drag: false,
  }),
  computed: {
    tracks: {
      get() {
        return this.$store.getters.getCassetteSideTracks(this.index).tracks;
      },
      set(value) {
        return this.$store.dispatch("moveTrack", {
          index: this.index,
          tracks: value,
        });
      },
    },
    duration() {
      return this.$store.getters.getCassetteSideDuration(this.index);
    },
    dragOptions() {
      return {
        animation: 150,
        group: "tracks",
        disabled: false,
      };
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
    unlockSide: function () {
      this.$store.dispatch("setSideLock", {
        index: this.index,
        locked: false,
      });
    },
    lockSide: function () {
      this.$store.dispatch("setSideLock", {
        index: this.index,
        locked: true,
      });
    },
    unhideSide: function () {
      this.$store.dispatch("setSideHidden", {
        index: this.index,
        hidden: false,
      });
    },
    deleteSide: function () {
      this.$store.dispatch("deleteSide", this.index);
    },
  },
});
</script>

<style scoped></style>
