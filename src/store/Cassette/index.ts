import { CassetteState } from "@/store/Cassette/types";
import { RootState } from "@/store/types";
import { Module } from "vuex";
import { actions } from "@/store/Cassette/actions";
import { mutations } from "@/store/Cassette/mutations";

const initialState: CassetteState = {
  a_side: [],
  b_side: [],
  total_duration_ms: 60 * 60000,
};

export const CassetteModule: Module<CassetteState, RootState> = {
  state: initialState,
  actions,
  mutations,
};
