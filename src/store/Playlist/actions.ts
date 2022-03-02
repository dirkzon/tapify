import { ActionTree } from "vuex";
import { PlaylistState } from "@/store/Playlist/types";
import { RootState } from "@/store/types";
import axios from "axios";
const { VUE_APP_SPOTIFY_ENDPOINT } = process.env;

export const actions: ActionTree<PlaylistState, RootState> = {
  async updatePlaylist({ rootGetters, state }): Promise<any> {
    const uris: string[] = [];
    rootGetters.getCassetteState.sides.forEach((s: any) =>
      uris.push(
        ...s.tracks.map((t: any) => {
          return "spotify:track:" + t.id;
        })
      )
    );

    console.log(state.id);
    console.log(uris.join(","));

    await axios
      .put(
        VUE_APP_SPOTIFY_ENDPOINT +
          "/playlists/" +
          state.id +
          "/tracks?uris=" +
          uris.join(","),
        {},
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getAccessToken}`,
            Accept: "application/json",
          },
        }
      )
      .catch((err) => {
        console.log(err);
      })
      .then((response) => {
        if (response) {
          console.log(response);
        }
      });
  },
};
