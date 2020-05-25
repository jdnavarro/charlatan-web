import { Episode, Episodes } from "./episode";

const progress = async (episode: Episode): Promise<void> => {
  const { id, progress } = episode;

  await fetch(`/episodes/${id}/progress`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Math.round(progress)),
  });
};

const episodes = async (setEpisodes: (_: Episodes) => void): Promise<void> => {
  const episodes = await (await fetch("/episodes")).json();
  setEpisodes(episodes);
};

const podcast = async (url: String): Promise<void> => {
  fetch("/podcasts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(url),
  });
};

export const API = { episodes, progress, podcast };
