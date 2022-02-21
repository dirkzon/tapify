import { ActionTree } from "vuex";
import { CassetteState, TrackState } from "@/store/Cassette/types";
import { RootState } from "@/store/types";
import axios from "axios";

const { VUE_APP_SPOTIFY_ENDPOINT } = process.env;

export const actions: ActionTree<CassetteState, RootState> = {
  async FillCassette({ commit, rootGetters }, payload): Promise<any> {
    commit("CLEAR_SIDES");

    let ids = "";
    await axios
      .get(VUE_APP_SPOTIFY_ENDPOINT + "/playlists/" + payload, {
        headers: {
          Authorization: `Bearer ${rootGetters.getAccessToken}`,
          Accept: "application/json",
        },
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      })
      .then(async (response: any) => {
        if (response) {
          const trackBuffer: any[] = [];
          response.data.tracks.items.forEach((item: any) => {
            trackBuffer.push(item.track);
            ids += item.track.id + ",";
          });
          commit("ADD_TRACKS", trackBuffer);
        }
        await axios
          .get(VUE_APP_SPOTIFY_ENDPOINT + "/audio-features?ids=" + ids, {
            headers: {
              Authorization: `Bearer ${rootGetters.getAccessToken}`,
              Accept: "application/json",
            },
          })
          .catch((err) => {
            console.log(err);
            throw new Error(err);
          })
          .then((response: any) => {
            response.data.audio_features.forEach((item: any) => {
              commit("SET_AUDIO_FEATURES", item);
            });
          });
        commit("SORT_TRACKS");
        commit("SET_SIDES_DURATION");
      });
  },

  SetTrackHidden({ commit }, payload) {
    commit("SET_HIDDEN", payload);
    commit("SET_LOCK", { id: payload, locked: false });
    commit("SORT_TRACKS");
    commit("SET_SIDES_DURATION");
  },

  setTrackLocked({ commit }, payload: { id: string; locked: boolean }) {
    commit("SET_LOCK", payload);
    commit("SORT_TRACKS");
    commit("SET_SIDES_DURATION");
  },

  moveTrack({ commit, state }, payload: { side: string; tracks: TrackState }) {
    if (payload.side === "a") {
      commit("SET_CASSETTE", [payload.tracks, state.b_side.tracks]);
    } else {
      commit("SET_CASSETTE", [state.a_side.tracks, payload.tracks]);
    }
  },
};
