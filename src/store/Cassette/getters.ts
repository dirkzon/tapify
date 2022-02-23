import { GetterTree } from "vuex";
import { CassetteState } from "@/store/Cassette/types";
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
};
