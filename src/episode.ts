export interface Episode {
  id: number;
  title: string;
  src: string;
  progress: number;
  position: number | null;
}

export interface CurrentEpisode extends Episode {
  playing: boolean;
}

export interface Episodes {
  [i: number]: Episode;
}
