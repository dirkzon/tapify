import { MutationTree } from "vuex";
import { CassetteState } from "@/store/Cassette/types";
import {
  mapObjectToTrack,
  sortTracks,
  sumTracksDuration,
} from "@/store/Cassette/service";

export const mutations: MutationTree<CassetteState> = {
  CLEAR_SIDES(state) {
    state.a_side.tracks = [];
    state.b_side.tracks = [];
  },

  ADD_TRACKS(state, payload) {
    payload.forEach((obj: any) => {
      state.a_side.tracks.push(mapObjectToTrack(obj));
    });
  },

  SET_CASSETTE(state, payload) {
    state.a_side.tracks = payload[0];
    state.b_side.tracks = payload[1];
  },

  SORT_TRACKS(state) {
    const [a_sorted, b_sorted] = sortTracks(
      state.a_side.tracks,
      state.b_side.tracks
    );

    state.a_side.tracks = a_sorted;
    state.b_side.tracks = b_sorted;
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
    const aSum = sumTracksDuration(state.a_side.tracks);
    state.a_side.total_duration = aSum;
    state.a_side.exceeds_duration = aSum > state.max_duration / 2;

    const bSum = sumTracksDuration(state.b_side.tracks);
    state.b_side.total_duration = bSum;
    state.b_side.exceeds_duration = bSum > state.max_duration / 2;
  },

  SET_MAX_DURATION(state, payload) {
    state.max_duration = payload * 60000;
  },
};

function findTrack(state: any, id: string): any {
  const a_index = state.a_side.tracks.findIndex((t: any) => t.id === id);
  if (a_index >= 0) {
    return state.a_side.tracks[a_index];
  } else {
    const b_index = state.b_side.tracks.findIndex((t: any) => t.id === id);
    if (b_index >= 0) {
      return state.b_side.tracks[b_index];
    }
  }
}
