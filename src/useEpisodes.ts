import React from "react";
import produce from "immer";

import * as API from "./api";
import type * as Current from "./current";
import type * as Feed from "./feed";
import type * as Queue from "./queue";
import type * as episode from "./episode";

export const useEpisodes = (): {
  feed: Feed.Episodes;
  queue: Queue.Episodes;
  enqueue: (id: string, pos?: number | null) => void;
  current: Current.Episode | null;
  currentify: (id: string) => void;
  toggle: () => void;
  setProgress: (progress: number) => void;
  details: (id: string) => Feed.Details;
} => {
  const [_episodes, setEpisodes] = React.useState<episode.Dict>(new Map());

  const [_queue, setQueue] = React.useState<Queue.Ids>([]);

  const [current, setCurrent] = React.useState<Current.Episode | null>(null);

  React.useEffect(() => {
    (async () => {
      const apiEpisodes = await API.episodes();
      const { episodes, queue, current } = unpack(apiEpisodes);
      setEpisodes(episodes);
      setQueue(queue);
      setCurrent(current);
    })();
  }, []);

  const enqueue = (id: string, position?: number | null): void => {
    if (position === null) {
      setQueue(
        produce(_queue, (draft) => {
          draft.splice(draft.indexOf(id), 1);
        })
      );
      setEpisodes(
        produce(_episodes, (draft) => {
          draft.set(id, { ...draft.get(id)!, queued: false });
        })
      );
    } else if (typeof position === "number") {
      setQueue(
        produce(_queue, (draft) => {
          const i = draft.indexOf(id);
          if (i > -1) {
            draft.splice(i, 1);
          }
          draft.splice(position, 0, id);
        })
      );
      setEpisodes(
        produce(_episodes, (draft) => {
          draft.set(id, { ...draft.get(id)!, queued: true });
        })
      );
    } else {
      setQueue(
        produce(_queue, (draft) => {
          if (!current) {
            currentify(id);
          } else {
            const i = draft.indexOf(id);
            if (i > -1) {
              draft.splice(i, 1);
            }
            draft.push(id);
          }
        })
      );
      setEpisodes(
        produce(_episodes, (draft) => {
          draft.set(id, { ...draft.get(id)!, queued: true });
        })
      );
    }
    API.position(id, position);
  };

  const currentify = (id: string): void => {
    enqueue(id, 0);
    // TODO: Rambda omit or immer?
    const {
      title,
      src,
      progress,
      duration,
      publication,
      image,
    } = _episodes.get(id)!;
    setCurrent({
      id,
      title,
      src,
      progress,
      duration,
      publication,
      image,
      playing: false,
    });
  };

  const feed = Array.from(_episodes).map(
    // TODO: Rambda omit or immer?
    ([id, { title, progress, duration, publication, image, queued }]) => ({
      id,
      title,
      progress,
      duration,
      publication,
      image,
      queued,
    })
  );

  const queue = _queue.map((id) => {
    // TODO: Rambda omit or immer?
    const {
      title,
      progress,
      duration,
      publication,
      image,
      queued,
    } = _episodes.get(id)!;
    return { id, title, progress, duration, publication, image, queued };
  });

  const toggle = (): void => {
    if (current) {
      setCurrent({ ...current, playing: !current.playing });
    }
  };

  const setProgress = (progress: number): void => {
    if (current) {
      setCurrent({ ...current, progress });
      setEpisodes(
        produce(_episodes, (draft) => {
          draft.set(current.id, { ...draft.get(current.id)!, progress });
        })
      );
      API.progress(current.id, progress);
    }
  };

  const details = (id: string): Feed.Details => {
    const {
      title,
      progress,
      duration,
      publication,
      image,
      queued,
      notes,
    } = _episodes.get(id)!;
    return { id, title, progress, duration, publication, image, notes, queued };
  };

  return {
    feed,
    queue,
    enqueue,
    current,
    currentify,
    toggle,
    setProgress,
    details,
  };
};

const unpack = (
  apiEpisodes: API.Episodes
): {
  episodes: episode.Dict;
  queue: Queue.Ids;
  current: Current.Episode | null;
} => {
  if (Object.keys(apiEpisodes).length === 0) {
    return { episodes: new Map(), queue: [], current: null };
  }

  const entries = Object.entries(apiEpisodes);

  const episodes = new Map(
    // TODO: Rambda omit or immer?
    entries.map(
      ([
        id,
        {
          title,
          progress,
          duration,
          publication,
          image,
          playing,
          notes,
          src,
          position,
        },
      ]) => [
        id,
        {
          title,
          progress,
          duration,
          publication,
          image,
          playing,
          notes,
          src,
          position,
          queued: position !== null,
        },
      ]
    )
  );

  const queue = entries
    .filter(([_, e]) => e.position !== null)
    .sort((a, b) => a[1].position - b[1].position)
    .map(([id, _]) => id);

  const id = queue.shift();

  // TODO: Rambda omit or immer?
  const current = id
    ? (() => {
        const {
          title,
          progress,
          duration,
          publication,
          image,
          src,
        } = episodes.get(id)!;
        return {
          id,
          title,
          progress,
          src,
          duration,
          publication,
          image,
          playing: false,
        };
      })()
    : null;

  return { episodes, queue, current };
};
