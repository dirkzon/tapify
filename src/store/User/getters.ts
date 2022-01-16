import { GetterTree } from "vuex";
import { RootState } from "@/store/types";
import { UserState } from "@/store/User/types";

export const getters: GetterTree<UserState, RootState> = {
  getAccessToken(state): string {
    return state.auth.access_token;
  },
  getUserProfile(state): any {
    return state.profile;
  },
};
