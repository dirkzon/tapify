import { MutationTree } from "vuex";
import { UserState } from "@/store/User/types";

export const mutations: MutationTree<UserState> = {
  SET_AUTH(state, payload: UserState) {
    state.access_token = payload.access_token;
    state.expires_in = payload.expires_in;
    state.refresh_token = payload.refresh_token;
    state.scope = payload.scope;
    state.token_type = payload.token_type;
  },
};
