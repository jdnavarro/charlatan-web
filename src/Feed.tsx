import React from "react";
import { useNavigate } from "@reach/router";

import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  ListItemSecondaryAction,
  IconButton,
  Toolbar,
} from "@material-ui/core";

import { Remove as RemoveIcon, Add as AddIcon } from "@material-ui/icons";

import type { Episodes, Episode } from "./feed";
import { TopBar } from "./TopBar";

interface Props {
  path: string;
  openDrawer: () => void;
  episodes: Episodes;
  enqueue: (id: string, pos?: number | null) => void;
}

export const Feed: React.FC<Props> = (props) => {
  const { openDrawer, episodes, enqueue } = props;

  return (
    <React.Fragment>
      <TopBar openDrawer={openDrawer} title="Episodes" />
      <main>
        <Toolbar />
        <List>
          {episodes.map((episode, key) => (
            <React.Fragment>
            <EpisodeItem key={key} episode={episode} enqueue={enqueue} />
            <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </main>
    </React.Fragment>
  );
};

const EpisodeItem: React.FC<{
  key: number;
  episode: Episode;
  enqueue: (id: string, pos?: number | null) => void;
}> = (props) => {
  const { episode, enqueue } = props;

  const navigate = useNavigate();

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

      {episode.queued ? (
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              enqueue(episode.id, null);
              navigate("/");
            }}
          >
            <RemoveIcon />
          </IconButton>
        </ListItemSecondaryAction>
      ) : (
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              enqueue(episode.id);
              navigate("/");
            }}
          >
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};
