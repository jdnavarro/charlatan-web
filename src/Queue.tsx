import React from "react";

import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
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
      <ListItemAvatar>
        <Avatar alt={episode.id} src={episode.image.toString()} />
      </ListItemAvatar>
      <ListItemText
        primary={episode.title}
        secondary={
          new Date(Number(episode.publication) * 1000).toDateString() +
          " -- " +
          new Date(Number(episode.duration * 1000)).toISOString().substr(11, 8)
        }
      />
      <ListItemSecondaryAction>
        <IconButton onClick={handleEnqueue}>
          <ArrowUpwardIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
