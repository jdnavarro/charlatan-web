import React from "react";
import produce from "immer";

import { Podcast } from "./podcast";
import * as api from "./api";

export const usePodcasts = (): {
  podcasts: Podcast[];
} => {
  const [podcasts, setPodcasts] = React.useState<Podcast[]>([]);

  React.useEffect(() => {
    (async () => {
      const apiPodcasts = await api.podcasts();
      setPodcasts(apiPodcasts);
      console.log(apiPodcasts);
    })();
  }, []);

  return { podcasts };
};
