import { SortState, TrackState } from "@/store/Cassette/types";
import _ from "lodash";

export function sortTracks(
  input_tracks: TrackState[][],
  input_sorts: SortState[][]
): TrackState[][] {
  const sides: TrackState[][] = [];

  input_tracks.forEach(() => {
    sides.push([]);
  });

  let concat: TrackState[] = [];
  input_tracks.forEach((tracks) => {
    concat = _.concat(concat, getNonHiddenAndNonLockedTracks(tracks));
  });

  const durationSort = _.sortBy(concat, ["duration_ms"]).reverse();

  //distribute songs between sides
  durationSort.forEach((track: TrackState) => {
    const sum1 =
      sumTracksDuration(sides[0]) +
      sumTracksDuration(getLockedTracks(input_tracks[0])) +
      track.duration_ms;
    const smallestSide = { index: 0, length: sum1 };
    for (let i = 1; i < sides.length; i++) {
      const sum =
        sumTracksDuration(sides[i]) +
        sumTracksDuration(getLockedTracks(input_tracks[i])) +
        track.duration_ms;
      if (sum < smallestSide.length) {
        smallestSide.index = i;
        smallestSide.length = sum;
      }
    }
    sides[smallestSide.index].push(track);
  });

  //sort sides
  for (let i = 0; i < input_sorts.length; i++) {
    sides[i] = _.orderBy(
      sides[i],
      input_sorts[i].map((s) => s.by),
      input_sorts[i].map((s) => s.direction.toLowerCase()) as ["asc" | "desc"]
    );
  }

  //add locked tracks
  for (let i = 0; i < input_tracks.length; i++) {
    for (let j = 0; j < input_tracks[i].length; j++) {
      if (input_tracks[i][j].locked) {
        sides[i].splice(j, 0, input_tracks[i][j]);
      }
    }
  }

  //add hidden tracks
  for (let i = 0; i < sides.length; i++) {
    sides[i] = _.concat(sides[i], getHiddenTracks(input_tracks[i]));
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
