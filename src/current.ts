import type * as episode from "./episode";

export interface Episode extends episode.Core {
  src: string;
  playing: boolean;
}
