import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { UserState } from "@/store/User/types";
import axios from "axios";

const { VUE_APP_SPOTIFY_AUTH_URI, VUE_APP_CLIENT_ID, VUE_APP_CLIENT_SECRET } =
  process.env;

//https://accounts.spotify.com/authorize?response_type=code&client_id=f280f9a3cce84889a09f0b9c2b09df85&scope=user-read-private user-read-email&redirect_uri=http://localhost:8080/callback

export const actions: ActionTree<UserState, RootState> = {
  async Authorize(state, { code, commit }): Promise<any> {
    const form = new URLSearchParams({
      code: code,
      redirect_uri: "http://localhost:8080/callback",
      grant_type: "authorization_code",
    });

    const result = await axios.post(
      VUE_APP_SPOTIFY_AUTH_URI + "/api/token",
      form,
      {
        headers: {
          Authorization: `Basic ${btoa(
            `${VUE_APP_CLIENT_ID}:${VUE_APP_CLIENT_SECRET}`
          )}`,
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(result.data);
    if (result.status === 200) {
      commit("SET_AUTH", result.data);
    } else {
      console.log(result.data);
    }
  },
};
