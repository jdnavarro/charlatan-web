import React from "react";

import { Toolbar, ListItem, ListItemText, List } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { Episode } from "./episode";
import { TopBar } from "./TopBar";

interface Props {
  path: string;
  openDrawer: () => void;
  episodes: Episode[];
  setEpisodes: (episodes: Episode[]) => void;
  currentEpisode: Episode | null;
  setCurrentEpisode: (episode: Episode) => void;
}

export const Feed: React.FC<Props> = (props) => {
  const {
    openDrawer,
    episodes,
    setEpisodes,
    currentEpisode,
    setCurrentEpisode,
  } = props;

  const EpisodeItem: React.FC<{ episode: Episode }> = (props) => {
    const { episode } = props;

    return (
      <ListItem>
        <ListItemText primary={episode.title} />
        {currentEpisode && episode.id === currentEpisode.id ? (
          <RemoveIcon />
        ) : (
          <AddIcon
            onClick={() => {
              setCurrentEpisode(episode);
              if (currentEpisode !== null) {
                let newEpisodes = episodes;
                newEpisodes[currentEpisode!.id - 1] = currentEpisode!;
                setEpisodes(newEpisodes);
              }
            }}
          />
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
          {episodes.map((item: Episode, index: number) => (
            <EpisodeItem episode={item} key={index} />
          ))}
        </List>
      </main>
    </React.Fragment>
  );
};
