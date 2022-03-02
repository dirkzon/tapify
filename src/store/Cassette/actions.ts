import { ActionTree } from "vuex";
import { CassetteState, SORT_KEY, TrackState } from "@/store/Cassette/types";
import { RootState } from "@/store/types";
import axios from "axios";
import { mapObjectToTrack } from "@/store/Cassette/service";
import { mapObjectToPlaylist } from "@/store/Playlist/service";

const { VUE_APP_SPOTIFY_ENDPOINT } = process.env;

export const actions: ActionTree<CassetteState, RootState> = {
  async FillCassette({ commit, rootGetters }, payload): Promise<any> {
    commit("RESET_SIDES");

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
          commit("SET_PLAYLIST", mapObjectToPlaylist(response.data));
          const trackBuffer: TrackState[] = [];
          response.data.tracks.items.forEach((item: any) => {
            trackBuffer.push(mapObjectToTrack(item.track));
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

  SetTrackHidden({ commit }, payload: { id: string; hidden: boolean }) {
    commit("SET_HIDDEN", payload);
    commit("SET_LOCK", { id: payload.id, locked: false });
    commit("SORT_TRACKS");
    commit("SET_SIDES_DURATION");
  },

  setTrackLocked({ commit }, payload: { id: string; locked: boolean }) {
    commit("SET_LOCK", payload);
    commit("SORT_TRACKS");
    commit("SET_SIDES_DURATION");
  },

  moveTrack(
    { commit, state },
    payload: { index: number; tracks: TrackState[] }
  ) {
    commit("SET_CASSETTE", payload);
  },

  addSide({ commit }) {
    commit("ADD_SIDE");
    commit("SORT_TRACKS");
    commit("SET_SIDES_DURATION");
  },

  setMaxDuration({ commit }, payload) {
    commit("SET_MAX_DURATION", payload);
    commit("SET_SIDES_DURATION");
  },

  setSideLock({ commit, state }, payload: { index: number; locked: boolean }) {
    state.sides[payload.index].tracks.forEach((t) => {
      commit("SET_LOCK", { id: t.id, locked: payload.locked });
    });
    commit("SORT_TRACKS");
    commit("SET_SIDES_DURATION");
  },

  setSideHidden(
    { commit, state },
    payload: { index: number; hidden: boolean }
  ) {
    state.sides[payload.index].tracks.forEach((t) => {
      commit("SET_HIDDEN", { id: t.id, hidden: payload.hidden });
    });
    commit("SORT_TRACKS");
    commit("SET_SIDES_DURATION");
  },

  deleteSide({ commit, state }, payload) {
    if (payload > 0) {
      state.sides[payload].tracks.forEach((t) => {
        commit("SET_LOCK", { id: t.id, locked: false });
      });
      commit("DELETE_SIDE", payload);
      commit("SORT_TRACKS");
      commit("SET_SIDES_DURATION");
    }
  },

  addSort({ commit, state }, payload: { sideIndex: number }) {
    const sortKeys = state.sides[payload.sideIndex].sorts?.map((s) => s.by);
    let key = "";
    Object.values(SORT_KEY).forEach((k: string) => {
      if (!sortKeys.includes(k as keyof TrackState)) {
        key = k;
      }
    });
    if (key) {
      commit("ADD_SORT", { sideIndex: payload.sideIndex, sortKey: key });
      commit("SORT_TRACKS");
    }
  },

  deleteSort({ commit }, payload: { sideIndex: number; sortIndex: number }) {
    commit("DELETE_SORT", payload);
    commit("SORT_TRACKS");
  },

  updateSort(
    { commit },
    payload: {
      sideIndex: number;
      sortIndex: number;
      sort: { by: string; direction: string };
    }
  ) {
    commit("UPDATE_SORT", payload);
    commit("SORT_TRACKS");
  },
};
