import { MutationTree } from "vuex";
import { CassetteState, TrackState } from "@/store/Cassette/types";
import { sortTracks } from "@/store/Cassette/service";

export const mutations: MutationTree<CassetteState> = {
  CLEAR_SIDES(state) {
    state.a_side = [];
    state.b_side = [];
  },

  ADD_TRACK(state, payload) {
    const newTrack: TrackState = {
      id: payload.id,
      artists: [],
      duration_ms: payload.duration_ms,
      name: payload.name,
      image: payload.album.images[0]?.url,
      locked: false,
      hidden: false,
    };
    payload.artists.forEach((a: any) => {
      newTrack.artists.push(a.name);
    });
    const allTracks = state.a_side.concat(state.b_side);
    allTracks.push(newTrack);

    const [a_sorted, b_sorted] = sortTracks(allTracks);

    state.a_side = a_sorted;
    state.b_side = b_sorted;
  },

  SET_HIDDEN(state, payload) {
    const track = findTrack(state, payload);
    track.hidden = !track.hidden;
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
    const track = findTrack(state, payload);
    track.locked = !track.locked;
  },
};

function findTrack(state: any, id: string): any {
  const a_index = state.a_side.findIndex((t: any) => t.id === id);
  if (a_index >= 0) {
    return state.a_side[a_index];
  } else {
    const b_index = state.b_side.findIndex((t: any) => t.id === id);
    if (b_index >= 0) {
      return state.b_side[b_index];
    }
  }
}
