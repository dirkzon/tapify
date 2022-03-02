import { PlaylistState } from "@/store/Playlist/types";

export function mapObjectToPlaylist(playlist: any): PlaylistState {
  return {
    image: playlist.images[0]?.url,
    name: playlist.name,
    id: playlist.id,
    url: playlist.external_urls.spotify,
    creator: playlist.owner.display_name,
  };
}
