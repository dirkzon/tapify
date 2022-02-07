import { TrackState } from "@/store/Cassette/types";
import _ from "lodash";

export function sortTracks(tracks: TrackState[]): [TrackState[], TrackState[]] {
  const durationSort = _.sortBy(tracks, ["duration_ms"]).reverse();
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
  return [a_side, b_side];
}

export function sumTracksDuration(tracks: TrackState[]) {
  return tracks.reduce((sum: number, track) => sum + track.duration_ms, 0);
}
