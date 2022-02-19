export interface CassetteState {
  a_side: CassetteSide;
  b_side: CassetteSide;
  max_duration: number;
}

export interface CassetteSide {
  tracks: TrackState[];
  total_duration: number;
  exceeds_duration: boolean;
}

export interface TrackState {
  name: string;
  id: string;
  image?: string;
  duration_ms: number;
  artists: string[];
  locked: boolean;
  hidden: boolean;
  danceability?: number;
  instrumentalness?: number;
  liveness?: number;
  tempo?: number;
  energy?: number;
}
