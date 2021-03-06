export interface Podcast {
  id: string;
  title: string;
  url: string;
  description: string;
  image: string;
}

export type Podcasts = {
  [id: string]: Podcast;
};
