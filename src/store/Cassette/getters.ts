import { GetterTree } from "vuex";
import { CassetteState, SORT_KEY } from "@/store/Cassette/types";
import { RootState } from "@/store/types";

export const getters: GetterTree<CassetteState, RootState> = {
  getCassetteState(state) {
    return state;
  },

  getCassetteSideTracks: (state) => (index: number) => {
    return state.sides[index];
  },

  getCassetteSideDuration: (state) => (index: number) => {
    return state.sides[index].total_duration;
  },

  countCassetteSides(state) {
    return state.sides.length;
  },

  getMaxDuration(state) {
    return state.max_duration;
  },

  getCassetteSideSorts: (state) => (index: number) => {
    return state.sides[index].sorts;
  },

  getCassetteSideSortByKey:
    (state) => (sideIndex: number, sortKey: SORT_KEY) => {
      return state.sides[sideIndex].tracks
        .filter((t) => !t.hidden)
        .map((t) => t[sortKey]);
    },
};
