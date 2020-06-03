import React from "react";
import { useNavigate } from "@reach/router";

import {
  Toolbar,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction,
  IconButton,
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
            <EpisodeItem key={key} episode={episode} enqueue={enqueue} />
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
      <ListItemText primary={episode.title} />

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
