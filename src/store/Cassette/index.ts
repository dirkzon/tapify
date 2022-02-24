import { CassetteState } from "@/store/Cassette/types";
import { RootState } from "@/store/types";
import { Module } from "vuex";
import { actions } from "@/store/Cassette/actions";
import { mutations } from "@/store/Cassette/mutations";
import { getters } from "@/store/Cassette/getters";

const initialState: CassetteState = {
  sides: [
    {
      tracks: [],
      total_duration: 0,
      sorts: [],
    },
    {
      tracks: [],
      total_duration: 0,
      sorts: [],
    },
  ],
  max_duration: 90 * 60000,
};

export const CassetteModule: Module<CassetteState, RootState> = {
  state: initialState,
  actions,
  mutations,
  getters,
};
