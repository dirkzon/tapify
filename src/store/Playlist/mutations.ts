import { MutationTree } from "vuex";
import { PlaylistState } from "@/store/Playlist/types";

export const mutations: MutationTree<PlaylistState> = {
  SET_PLAYLIST(state, payload) {
    state.image = payload.image;
    state.name = payload.name;
    state.creator = payload.creator;
    state.id = payload.id;
    state.url = payload.url;
  },
};
