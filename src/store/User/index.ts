import { Module } from "vuex";
import { RootState } from "@/store/types";
import { UserState } from "@/store/User/types";
import { getters } from "@/store/User/getters";
import { mutations } from "@/store/User/mutations";
import { actions } from "@/store/User/actions";

const initialState: UserState = {
  profile: {
    name: "",
    image: "",
    uri: "",
    url: "",
  },
  auth: {
    access_token: "",
    expires_in: "",
    refresh_token: "",
  },
};

export const UserModule: Module<UserState, RootState> = {
  state: initialState,
  getters,
  mutations,
  actions,
};
