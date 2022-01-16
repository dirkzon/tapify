import { MutationTree } from "vuex";
import { UserState } from "@/store/User/types";

export const mutations: MutationTree<UserState> = {
  SET_AUTH(state, payload) {
    state.auth.access_token = payload.access_token;
    state.auth.refresh_token = payload.refresh_token;
    state.auth.expires_in = payload.expires_in;
  },

  SET_PROFILE(state, payload) {
    state.profile.name = payload.display_name;
    state.profile.url = payload.external_urls.spotify;
    state.profile.image = payload.images[0]?.url;
    state.profile.uri = payload.uri;
  },
};
