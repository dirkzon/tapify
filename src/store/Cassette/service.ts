import { TrackState } from "@/store/Cassette/types";
import _ from "lodash";

export function sortTracks(input: TrackState[][]): TrackState[][] {
  const sides: TrackState[][] = [];

  input.forEach(() => {
    sides.push([]);
  });

  let concat: TrackState[] = [];
  input.forEach((tracks) => {
    concat = _.concat(concat, getNonHiddenAndNonLockedTracks(tracks));
  });

  const durationSort = _.sortBy(concat, ["duration_ms"]).reverse();

  durationSort.forEach((track: TrackState) => {
    const sum1 =
      sumTracksDuration(sides[0]) +
      sumTracksDuration(getLockedTracks(input[0])) +
      track.duration_ms;
    const smallestSide = { index: 0, length: sum1 };
    for (let i = 1; i < sides.length; i++) {
      const sum =
        sumTracksDuration(sides[i]) +
        sumTracksDuration(getLockedTracks(input[i])) +
        track.duration_ms;
      if (sum < smallestSide.length) {
        smallestSide.index = i;
        smallestSide.length = sum;
      }
    }
    sides[smallestSide.index].push(track);
  });

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j].locked) {
        sides[i].splice(j, 0, input[i][j]);
      }
    }
  }

  for (let i = 0; i < sides.length; i++) {
    sides[i] = _.concat(sides[i], getHiddenTracks(input[i]));
  }

  return sides;
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

export function findTrack(state: any, id: string): any {
  let output = null;
  state.sides.forEach((s: any) => {
    const index = s.tracks.findIndex((t: any) => t.id === id);
    if (index >= 0) {
      output = s.tracks[index];
    }
  });
  return output;
}
