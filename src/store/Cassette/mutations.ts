import { MutationTree } from "vuex";
import { CassetteState, TrackState } from "@/store/Cassette/types";
import {
  sortTracks,
  sumTracksDuration,
  findTrack,
} from "@/store/Cassette/service";
import Vue from "vue";

export const mutations: MutationTree<CassetteState> = {
  CLEAR_SIDES(state) {
    state.sides.forEach((s) => {
      s.tracks = [];
    });
  },

  ADD_TRACKS(state, payload: TrackState[]) {
    Vue.set(state.sides, 0, { ...state.sides[0], tracks: payload });
  },

  SET_CASSETTE(state, payload) {
    for (let i = 0; i < state.sides.length; i++) {
      Vue.set(state.sides, i, { ...state.sides[0], tracks: payload[i] });
    }
  },

  SORT_TRACKS(state) {
    const test: TrackState[][] = [];
    for (let i = 0; i < state.sides.length; i++) {
      test.push(state.sides[i].tracks);
    }

    const sortedSides = sortTracks(test);

    for (let i = 0; i < sortedSides.length; i++) {
      Vue.set(state.sides, i, { ...state.sides[0], tracks: sortedSides[i] });
    }
  },

  SET_HIDDEN(state, payload) {
    const track = findTrack(state, payload.id);
    track.hidden = payload.hidden;
  },

  SET_AUDIO_FEATURES(state, payload) {
    const track = findTrack(state, payload.id);
    track.danceability = payload.danceability;
    track.energy = payload.energy;
    track.instrumentalness = payload.instrumentalness;
    track.liveness = payload.liveness;
    track.tempo = payload.tempo;
  },

  SET_LOCK(state, payload) {
    const track = findTrack(state, payload.id);
    track.locked = payload.locked;
  },

  SET_SIDES_DURATION(state) {
    state.sides.forEach((s) => {
      s.total_duration = sumTracksDuration(s.tracks);
    });
  },
};
