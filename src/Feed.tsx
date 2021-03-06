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

import type { Episodes, Episode, Details } from "./feed";
import { EpisodeDetails } from "./EpisodeDetails";
import { TopBar } from "./TopBar";

interface Props {
  path: string;
  openDrawer: () => void;
  episodes: Episodes;
  enqueue: (id: string, pos?: number | null) => void;
  details: (id: string) => Details;
}

export const Feed: React.FC<Props> = (props) => {
  const { openDrawer, episodes, enqueue, details } = props;

  return (
    <React.Fragment>
      <TopBar openDrawer={openDrawer} title="Episodes" />
      <main>
        <Toolbar />
        <List>
          {episodes.map((episode, key) => (
            <React.Fragment key={key}>
              <EpisodeItem
                episode={episode}
                enqueue={enqueue}
                details={details}
              />
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </main>
    </React.Fragment>
  );
};

const EpisodeItem: React.FC<{
  episode: Episode;
  enqueue: (id: string, pos?: number | null) => void;
  details: (id: string) => Details;
}> = (props) => {
  const { episode, enqueue, details } = props;

  const navigate = useNavigate();

  const [episodeDetailsDrawer, setEpisodeDetailsDrawer] = React.useState(false);

  const openEpisodeDetails = (): void => {
    setEpisodeDetailsDrawer(true);
  };

  const closeEpisodeDetails = (): void => {
    setEpisodeDetailsDrawer(false);
  };

  return (
    <React.Fragment>
      <ListItem onClick={openEpisodeDetails}>
        <ListItemAvatar>
          <Avatar alt={episode.id} src={episode.image.toString()} />
        </ListItemAvatar>
        <ListItemText
          primary={episode.title}
          secondary={
            new Date(Number(episode.publication) * 1000).toDateString() +
            " -- " +
            new Date(Number(episode.duration * 1000))
              .toISOString()
              .substr(11, 8)
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
      <EpisodeDetails
        closeEpisodeDetails={closeEpisodeDetails}
        drawer={episodeDetailsDrawer}
        details={details(episode.id)}
      />
    </React.Fragment>
  );
};
