import React from "react";

import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

import { Episode } from "./episode";

interface Props {
  queue: boolean;
  closeQueue: () => void;
  episodes: Episode[];
  setEpisodes: (episodes: Episode[]) => void;
}

export const Queue: React.FC<Props> = (props) => {
  const { closeQueue, queue, episodes, setEpisodes } = props;
  return (
    <Drawer onClick={closeQueue} open={queue} anchor="bottom">
      <List>
        {episodes
          .filter((e) => e.position !== null)
          .map((item: Episode, index: number) => (
            <QueueItem episode={item} key={index} />
          ))}
      </List>
    </Drawer>
  );
};

const QueueItem: React.FC<{ episode: Episode }> = (props) => {
  const { episode } = props;

  return (
    <ListItem>
      <ListItemText primary={episode.title} />
    </ListItem>
  );
};
