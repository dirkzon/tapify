import { PlaylistState } from "@/store/Playlist/types";
import { Module } from "vuex";
import { RootState } from "@/store/types";
import { getters } from "@/store/Playlist/getters";
import { actions } from "@/store/Playlist/actions";
import { mutations } from "@/store/Playlist/mutations";

const initialState: PlaylistState = {
  image: "",
  name: "",
  id: "",
  url: "",
  creator: "",
};

export const PlaylistModule: Module<PlaylistState, RootState> = {
  state: initialState,
  getters,
  actions,
  mutations,
};
