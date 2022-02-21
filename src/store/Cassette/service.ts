import { TrackState } from "@/store/Cassette/types";
import _ from "lodash";

export function sortTracks(
  a: TrackState[],
  b: TrackState[]
): [TrackState[], TrackState[]] {
  const aSide: TrackState[] = [];
  const bSide: TrackState[] = [];

  const concat = _.concat(
    getNonHiddenAndNonLockedTracks(a),
    getNonHiddenAndNonLockedTracks(b)
  );

  const durationSort = _.sortBy(concat, ["duration_ms"]).reverse();

  durationSort.forEach((track: TrackState) => {
    const aSum =
      sumTracksDuration(aSide) +
      sumTracksDuration(getLockedTracks(a)) +
      track.duration_ms;
    const bSum =
      sumTracksDuration(bSide) +
      sumTracksDuration(getLockedTracks(b)) +
      track.duration_ms;

    if (aSum < bSum) {
      aSide.push(track);
    } else {
      bSide.push(track);
    }
  });

  for (let i = 0; i < a.length; i++) {
    if (a[i].locked) {
      aSide.splice(i, 0, a[i]);
    }
  }

  for (let i = 0; i < b.length; i++) {
    if (b[i].locked) {
      bSide.splice(i, 0, b[i]);
    }
  }

  return [
    _.concat(aSide, getHiddenTracks(a)),
    _.concat(bSide, getHiddenTracks(b)),
  ];
}

function getNonHiddenAndNonLockedTracks(tracks: TrackState[]) {
  return _.filter(tracks, (t) => {
    return !t.hidden && !t.locked;
  });
}

function getHiddenTracks(tracks: TrackState[]) {
  return _.filter(tracks, (t) => {
    return t.hidden && !t.locked;
  });
}

function getLockedTracks(tracks: TrackState[]) {
  return _.filter(tracks, (t) => {
    return !t.hidden && t.locked;
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
  obj.artists.forEach((a: any) => {
    track.artists.push(a.name);
  });
  return track;
}
