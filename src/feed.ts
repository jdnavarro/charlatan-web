export interface Episode {
  id: string;
  title: string;
  progress: number;
  queued: boolean;
}

export type Episodes = Episode[];

export type EpisodesById = Map<
  string,
  { title: string; src: string; progress: number; queued: boolean }
>;
