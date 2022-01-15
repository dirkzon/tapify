import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import {RootState} from "@/store/types";
import { authModule } from "./User/index"

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        hello: "bruhaaaaa"
    },
    modules: {
        authModule,
    }
}

export default new Vuex.Store<RootState>(store);
