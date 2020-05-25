import React from "react";
import { useNavigate } from "@reach/router";

import { Toolbar, ListItem, ListItemText, List } from "@material-ui/core";

import {
  PlayArrow as PlayIcon,
  Remove as RemoveIcon,
  Add as AddIcon,
  Pause as PauseIcon,
} from "@material-ui/icons";

import { Episode, Episodes, CurrentEpisode } from "./episode";
import { TopBar } from "./TopBar";

interface Props {
  path: string;
  openDrawer: () => void;
  episodes: Episodes;
  setEpisodes: (episodes: Episodes) => void;
  currentEpisode: CurrentEpisode | null;
  setCurrentEpisode: (e: CurrentEpisode) => void;
}

const maxPosition = (episodes: Episodes): any => {
  const arr = Object.values(episodes).map((e) => {
    if (e.position === null) {
      return 0;
    } else {
      return e.position;
    }
  });
  return Math.max(...arr);
};

export const Feed: React.FC<Props> = (props) => {
  const {
    openDrawer,
    episodes,
    setEpisodes,
    currentEpisode,
    setCurrentEpisode,
  } = props;

  const navigate = useNavigate();

  const EpisodeItem: React.FC<{ episode: Episode }> = (props) => {
    const { episode } = props;

    return (
      <ListItem>
        <ListItemText primary={episode.title} />
        {episode.position !== null ? (
          <RemoveIcon
            onClick={() => {
              // FIXME: Shift positions
              episode.position = null;
              episodes[episode.id] = episode;
              setEpisodes(episodes);
              navigate("/");
            }}
          />
        ) : (
          <AddIcon
            onClick={() => {
              episode.position = maxPosition(episodes);
              if (episode.position === 0) {
                setCurrentEpisode({ ...episode, playing: false });
              }
              episodes[episode.id] = episode;
              setEpisodes(episodes);
              navigate("/");
            }}
          />
        )}
        {currentEpisode &&
        currentEpisode.id === episode.id &&
        currentEpisode.playing ? (
          <PauseIcon
            onClick={() =>
              setCurrentEpisode({ ...currentEpisode, playing: false })
            }
          />
        ) : (
          <PlayIcon />
        )}
      </ListItem>
    );
  };

  return (
    <React.Fragment>
      <TopBar openDrawer={openDrawer} title="Episodes" />
      <main>
        <Toolbar />
        <List>
          {Object.values(episodes).map((item: Episode, index: number) => (
            <EpisodeItem episode={item} key={index} />
          ))}
        </List>
      </main>
    </React.Fragment>
  );
};
