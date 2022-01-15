import { Module } from "vuex";
import { RootState } from "@/store/types";
import { UserState } from "@/store/User/types";
import { getters } from "@/store/User/getters";
import { mutations } from "@/store/User/mutations";
import { actions } from "@/store/User/actions";

const state: UserState = {
    access_token: "",
    expires_in: "",
    refresh_token: "",
    scope: "",
    token_type: ""
}

export const authModule: Module<UserState, RootState> = {
    state,
    getters,
    mutations,
    actions,
}
