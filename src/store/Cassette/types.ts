export interface CassetteState {
  a_side: TrackState[];
  b_side: TrackState[];
  total_duration_ms: number;
}

export interface TrackState {
  name: string;
  id: string;
  image?: string;
  duration_ms: number;
  artists: string[];
  danceability?: number;
  instrumentalness?: number;
  liveness?: number;
  tempo?: number;
  energy?: number;
}
