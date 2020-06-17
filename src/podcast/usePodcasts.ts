import React from "react";
import produce from "immer";

import { Podcast, Podcasts } from "./podcast";
import * as api from "./api";

export const usePodcasts = (): {
  podcasts: Podcast[];
  remove: (id: string) => void;
} => {
  const [_podcasts, setPodcasts] = React.useState<Podcasts>({});

  React.useEffect(() => {
    (async () => {
      const apiPodcasts = await api.podcasts();
      setPodcasts(apiPodcasts);
    })();
  }, []);

  const remove = (id: string) => {
    const p = produce(_podcasts, (draft) => {
      delete draft[id];
    });
    setPodcasts(p);
    // TODO: Delete episodes of podcasts in UI
    api.remove(id);
  };

  return { podcasts: Object.values(_podcasts), remove };
};
