import { GetterTree } from "vuex";
import { PlaylistState } from "@/store/Playlist/types";
import { RootState } from "@/store/types";
import axios from "axios";

const { VUE_APP_SPOTIFY_ENDPOINT } = process.env;

export const getters: GetterTree<PlaylistState, RootState> = {
  async getUsersPlaylists(state, rootGetters): Promise<any> {
    const output: PlaylistState[] = [];
    await axios
      .get(VUE_APP_SPOTIFY_ENDPOINT + "/me/playlists", {
        headers: {
          Authorization: `Bearer ${rootGetters.getAccessToken}`,
          Accept: "application/json",
        },
      })
      .catch((err) => {
        console.log(err);
      })
      .then((response) => {
        if (response) {
          response["data"].items.forEach((item: any) => {
            output.push(mapPlaylist(item));
          });
        }
      });
    return output;
  },
};

function mapPlaylist(playlist: any): PlaylistState {
  return {
    image: playlist.images[0]?.url,
    name: playlist.name,
    id: playlist.id,
    url: playlist.external_urls.spotify,
    creator: playlist.owner.display_name,
  };
}
