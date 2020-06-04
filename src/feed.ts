import type * as episode from "./episode";

export interface Episode extends episode.Core {
  queued: boolean;
}

export type Episodes = Episode[];
