import React from "react";
import produce from "immer";

import * as API from "./api";
import type * as Current from "./current";
import type * as Feed from "./feed";
import type * as Queue from "./queue";

export const useEpisodes = (): {
  feed: Feed.Episodes;
  queue: Queue.Episodes;
  enqueue: (id: string, pos?: number | null) => void;
  current: Current.Episode | null;
  currentify: (id: string) => void;
  toggle: () => void;
  setProgress: (progress: number) => void;
} => {
  const [_feed, setFeed] = React.useState<Feed.EpisodesById>(new Map());

  const [_queue, setQueue] = React.useState<Queue.Ids>([]);

  const [current, setCurrent] = React.useState<Current.Episode | null>(null);

  React.useEffect(() => {
    (async () => {
      const episodes = await API.episodes();
      const { feed, queue, current } = unpack(episodes);
      setFeed(feed);
      setQueue(queue);
      setCurrent(current);
    })();
  }, []);

  const enqueue = (id: string, pos?: number | null): void => {
    if (pos === null) {
      setQueue(
        produce(_queue, (draft) => {
          draft.splice(draft.indexOf(id), 1);
        })
      );
      setFeed(
        produce(_feed, (draft) => {
          draft.set(id, { ...draft.get(id)!, queued: false });
        })
      );
    } else if (typeof pos === "number") {
      setQueue(
        produce(_queue, (draft) => {
          const i = draft.indexOf(id);
          if (i > -1) {
            draft.splice(i, 1);
          }
          draft.splice(pos, 0, id);
        })
      );
      setFeed(
        produce(_feed, (draft) => {
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
      setFeed(
        produce(_feed, (draft) => {
          draft.set(id, { ...draft.get(id)!, queued: true });
        })
      );
    }
  };

  const currentify = (id: string): void => {
    enqueue(id, 0);
    const { title, src, progress } = _feed.get(id)!;
    setCurrent({ id, title, src, progress, playing: false });
  };

  const feed = Array.from(_feed).map(([id, { title, progress, queued }]) => ({
    id,
    title,
    progress,
    queued,
  }));

  const queue = _queue.map((id) => {
    const { title, progress } = _feed.get(id)!;
    return { id, title, progress };
  });

  const toggle = (): void => {
    if (current) {
      setCurrent({ ...current, playing: !current.playing });
    }
  };

  const setProgress = (progress: number): void => {
    if (current) {
      setCurrent({ ...current, progress });
      setFeed(
        produce(_feed, (draft) => {
          draft.set(current.id, { ...draft.get(current.id)!, progress });
        })
      );
    }
  };

  return { feed, queue, enqueue, current, currentify, toggle, setProgress };
};

const unpack = (
  episodes: API.Episodes
): {
  feed: Feed.EpisodesById;
  queue: Queue.Ids;
  current: Current.Episode | null;
} => {
  if (Object.keys(episodes).length === 0) {
    return { feed: new Map(), queue: [], current: null };
  }

  const entries = Object.entries(episodes);

  const feed = new Map(
    entries.map(([id, { title, progress, src, position }]) => [
      id,
      { title, progress, src, queued: position !== null },
    ])
  );

  const queue = entries
    .filter(([_, e]) => e.position !== null)
    .sort((a, b) => a[1].position - b[1].position)
    .map(([id, _]) => id);

  const id = queue.shift();

  const current = id
    ? (() => {
        const { title, progress, src } = feed.get(id)!;
        return { id, title, progress, src, playing: false };
      })()
    : null;

  return { feed, queue, current };
};
