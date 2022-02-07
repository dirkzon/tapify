import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "@/store/types";
import { UserModule } from "./User/index";
import { PlaylistModule } from "./Playlist/index";
import { CassetteModule } from "@/store/Cassette";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    hello: "bruhaaaaa",
  },
  modules: {
    UserModule,
    PlaylistModule,
    CassetteModule,
  },
};

export default new Vuex.Store<RootState>(store);
