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
    console.log("aaaaa");
    return state.total_duration_ms;
  },

  getTrackById(state, id) {
    const a_index = state.a_side.findIndex((t: any) => t.id === id);
    if (a_index >= 0) {
      return state.a_side[a_index];
    } else {
      const b_index = state.b_side.findIndex((t: any) => t.id === id);
      if (b_index >= 0) {
        return state.b_side[b_index];
      }
    }
  },
};
