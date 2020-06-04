import type * as episode from "./episode";

export interface Episode extends episode.Core {
  src: string;
  playing: boolean;
}
export interface Details extends Episode {
  notes: string;
  playing: boolean;
}
