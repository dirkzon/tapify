import { MutationTree } from "vuex";
import { CassetteState, TrackState } from "@/store/Cassette/types";
import {
  sortTracks,
  sumTracksDuration,
  findTrack,
} from "@/store/Cassette/service";
import Vue from "vue";
import _ from "lodash";

export const mutations: MutationTree<CassetteState> = {
  RESET_SIDES(state) {
    for (let i = 0; i < state.sides.length; i++) {
      Vue.delete(state.sides, i);
    }
    Vue.set(state.sides, 0, { ...state.sides[0], sorts: [], tracks: [] });
    Vue.set(state.sides, 1, { ...state.sides[1], sorts: [], tracks: [] });
  },

  ADD_TRACKS(state, payload: TrackState[]) {
    Vue.set(state.sides, 0, { ...state.sides[0], tracks: payload });
  },

  ADD_SIDE(state) {
    Vue.set(state.sides, state.sides.length, {
      tracks: [],
      total_duration: 0,
    });
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

  DELETE_SIDE(state, payload) {
    const appendedTracks = _.concat(
      state.sides[0].tracks,
      state.sides[payload].tracks
    );
    Vue.set(state.sides, 0, { ...state.sides[0], tracks: appendedTracks });
    Vue.delete(state.sides, payload);
  },

  ADD_SORT(state, payload) {
    console.log(payload);
    Vue.set(state.sides, payload.sideIndex, {
      ...state.sides[payload.sideIndex],
      sorts: [
        ...state.sides[payload.sideIndex].sorts,
        {
          by: payload.sortKey,
          direction: "ASC",
        },
      ],
    });
  },

  DELETE_SORT(state, payload) {
    Vue.delete(state.sides[payload.sideIndex].sorts, payload.sortIndex);
  },

  UPDATE_SORT(state, payload) {
    Vue.set(state.sides[payload.sideIndex].sorts, payload.sortIndex, {
      by: payload.sort.by,
      direction: payload.sort.direction,
    });
  },
};
