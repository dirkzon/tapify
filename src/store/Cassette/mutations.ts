import { MutationTree } from "vuex";
import { CassetteState, TrackState } from "@/store/Cassette/types";
import { sortTracks } from "@/store/Cassette/service";

export const mutations: MutationTree<CassetteState> = {
  ADD_TRACK(state, payload) {
    const newTrack: TrackState = {
      id: payload.id,
      artists: [],
      duration_ms: payload.duration_ms,
      name: payload.name,
      image: payload.album.images[0]?.url,
    };
    payload.artists.forEach((a: any) => {
      newTrack.artists.push(a.name);
    });
    const allTracks = state.a_side.concat(state.b_side);
    allTracks.push(newTrack);
    const [a_sorted, b_sorted] = sortTracks(allTracks);
    for (let i = 0; i < a_sorted.length; i++) {
      state.a_side[i] = a_sorted[i];
    }
    for (let i = 0; i < b_sorted.length; i++) {
      state.b_side[i] = b_sorted[i];
    }
    console.log([a_sorted, b_sorted]);
  },

  SET_AUDIO_FEATURES(state, payload) {
    const a_index = state.a_side.findIndex((t) => t.id === payload.id);
    console.log(a_index);
    if (a_index >= 0) {
      setTrackAudioFeatures(state.a_side[a_index], payload);
    } else {
      const b_index = state.b_side.findIndex((t) => t.id === payload.id);
      console.log(b_index);
      if (b_index >= 0) {
        setTrackAudioFeatures(state.b_side[b_index], payload);
      }
    }
  },
};

function setTrackAudioFeatures(track: TrackState, audio_features: any) {
  track.danceability = audio_features.danceability;
  track.energy = audio_features.energy;
  track.instrumentalness = audio_features.instrumentalness;
  track.liveness = audio_features.liveness;
  track.tempo = audio_features.tempo;
}
