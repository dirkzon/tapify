import { GetterTree } from "vuex";
import { CassetteState } from "@/store/Cassette/types";
import { RootState } from "@/store/types";

export const getters: GetterTree<CassetteState, RootState> = {
  getCassetteSides(state) {
    return [state.a_side, state.b_side];
  },

  getCassetteSide(state, side) {
    if (side === "a") {
      return state.a_side;
    } else {
      return state.b_side;
    }
  },

  getTotalCassetteDuration(state) {
    return state.total_duration_ms;
  },
};
