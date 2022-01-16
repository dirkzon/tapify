import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { UserState } from "@/store/User/types";
import axios from "axios";

const {
  VUE_APP_SPOTIFY_AUTH_URI,
  VUE_APP_CLIENT_ID,
  VUE_APP_CLIENT_SECRET,
  VUE_APP_SPOTIFY_ENDPOINT,
} = process.env;

export const actions: ActionTree<UserState, RootState> = {
  async Authorize(state, { code }): Promise<any> {
    const form = new URLSearchParams({
      code: code,
      redirect_uri: "http://localhost:8080/callback",
      grant_type: "authorization_code",
    });

    if (state.state.auth.access_token !== "") {
      await axios
        .post(VUE_APP_SPOTIFY_AUTH_URI + "/api/token", form, {
          headers: {
            Authorization: `Basic ${btoa(
              `${VUE_APP_CLIENT_ID}:${VUE_APP_CLIENT_SECRET}`
            )}`,
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .catch((err) => {
          console.log(err.response.data.error_descriptions);
          throw new Error(err.response.data.error_description);
        })
        .then((response) => {
          state.commit("SET_AUTH", response.data);
        });
    }
  },

  async FetchUserProfile(state) {
    await axios
      .get(VUE_APP_SPOTIFY_ENDPOINT + "/me", {
        headers: {
          Authorization: `Bearer ${state.state.auth.access_token}`,
          Accept: "application/json",
        },
      })
      .catch((err) => {
        console.log(err.response);
        throw new Error(err.response);
      })
      .then((response) => {
        state.commit("SET_PROFILE", response.data);
      });
  },
};
