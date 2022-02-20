import { GetterTree } from "vuex";
import { CassetteState } from "@/store/Cassette/types";
import { RootState } from "@/store/types";

export const getters: GetterTree<CassetteState, RootState> = {
  getCassetteSides(state) {
    return [state.a_side, state.b_side];
  },

  getMaxDuration(state) {
    return state.max_duration;
  },

  getTotalCassetteDuration(state) {
    return state.a_side.total_duration + state.b_side.total_duration;
  },
};
