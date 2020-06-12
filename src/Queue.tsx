import React from "react";

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { ArrowUpward as ArrowUpwardIcon } from "@material-ui/icons";

import { Episodes, Episode } from "./queue";

interface Props {
  drawer: boolean;
  closeQueue: (e: any) => void;
  episodes: Episodes;
  enqueue: (id: string, pos?: number | null) => void;
}

export const Queue: React.FC<Props> = (props) => {
  const { closeQueue, drawer, episodes, enqueue } = props;

  return (
    <Drawer onClick={closeQueue} open={drawer} anchor="bottom">
      <List>
        {episodes.map((episode, key) => (
          <EpisodeItem key={key} episode={episode} enqueue={enqueue} />
        ))}
      </List>
    </Drawer>
  );
};

const EpisodeItem: React.FC<{
  episode: Episode;
  enqueue: (id: string, pos?: number | null) => void;
}> = (props) => {
  const { episode, enqueue } = props;

  const handleEnqueue = (e: any) => {
    e.stopPropagation();
    enqueue(episode.id, 0);
  };

  return (
    <ListItem>
      <ListItemText primary={episode.title} />
      <ListItemSecondaryAction>
        <IconButton onClick={handleEnqueue}>
          <ArrowUpwardIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
