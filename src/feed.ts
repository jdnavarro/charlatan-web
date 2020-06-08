import type * as episode from "./episode";

export interface Episode extends episode.Core {
  queued: boolean;
}

export interface Details extends Episode {
  notes: string;
}

export type Episodes = Episode[];
