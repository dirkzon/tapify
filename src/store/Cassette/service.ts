import { TrackState } from "@/store/Cassette/types";
import _ from "lodash";

export function sortTracks(
  a: TrackState[],
  b: TrackState[]
): [TrackState[], TrackState[]] {
  const concat = _.concat(getNonHiddenTracks(a), getNonHiddenTracks(b));

  const durationSort = _.sortBy(concat, ["duration_ms"]).reverse();
  const a_side: TrackState[] = [];
  const b_side: TrackState[] = [];

  for (let i = 0; i < durationSort.length; i += 2) {
    if (i + 1 < durationSort.length) {
      const k = durationSort[i];
      const y = durationSort[i + 1];

      const a_sum = sumTracksDuration(a_side);
      const b_sum = sumTracksDuration(b_side);

      if (
        a_sum + k.duration_ms - (b_sum + y.duration_ms) >
        a_sum + y.duration_ms - (b_sum + k.duration_ms)
      ) {
        a_side.push(k);
        b_side.push(y);
      } else {
        a_side.push(y);
        b_side.push(k);
      }
    } else {
      if (sumTracksDuration(a_side) > sumTracksDuration(b_side)) {
        b_side.push(durationSort[i]);
      } else {
        a_side.push(durationSort[i]);
      }
    }
  }
  const a_w_hidden = _.concat(a_side, getHiddenTracks(a));
  const b_w_hidden = _.concat(b_side, getHiddenTracks(b));
  return [a_w_hidden, b_w_hidden];
}

function getNonHiddenTracks(tracks: TrackState[]) {
  return _.filter(tracks, (t) => {
    return !t.hidden;
  });
}

function getHiddenTracks(tracks: TrackState[]) {
  return _.filter(tracks, (t) => {
    return t.hidden;
  });
}

export function sumTracksDuration(tracks: TrackState[]) {
  return _.sumBy(tracks, (t) => {
    return t.hidden ? 0 : t.duration_ms;
  });
}

export function mapObjectToTrack(obj: any): TrackState {
  const track: TrackState = {
    id: obj.id,
    artists: [],
    duration_ms: obj.duration_ms,
    name: obj.name,
    image: obj.album.images[0]?.url,
    locked: false,
    hidden: false,
  };
  track.artists.forEach((a: any) => {
    obj.artists.push(a.name);
  });
  return track;
}
