import { ActionTree } from "vuex";
import { CassetteState } from "@/store/Cassette/types";
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
      .then((response: any) => {
        if (response) {
          response.data.tracks.items.forEach((item: any) => {
            commit("ADD_TRACK", item.track);
            ids += item.track.id + ",";
          });
        }
      });
    commit("SORT_TRACKS");
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
    commit("SET_SIDES_DURATION");
  },

  SetTrackHidden({ commit }, payload) {
    commit("SET_HIDDEN", payload);
    commit("SORT_TRACKS");
    commit("SET_SIDES_DURATION");
  },

  setTrackLocked({ commit }, payload) {
    commit("SET_LOCK", payload);
  },
};
