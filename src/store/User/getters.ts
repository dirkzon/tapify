import {GetterTree} from "vuex";
import {RootState} from "@/store/types";
import {UserState} from "@/store/User/types";

export const getters: GetterTree<UserState, RootState> = {
    getAuthData(state): UserState {
        return state;
    },
    getAccessToken(state): string {
        return state.access_token;
    }
}
