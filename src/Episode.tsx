import React from "react";

import { Toolbar, ListItem, ListItemText, List } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { Episode } from "./episode";
import { TopBar } from "./TopBar";

interface Props {
  path: string;
  openDrawer: () => void;
  currentEpisode: Episode | null;
  setCurrentEpisode: (episode: Episode) => void;
}

export const Episodes: React.FC<Props> = (props) => {
  const { openDrawer, currentEpisode, setCurrentEpisode } = props;

  const [episodes, setEpisodes] = React.useState<Array<Episode>>([]);

  React.useEffect(() => {
    fetch("/episodes")
      .then((response) => response.json())
      .then((episodes) => {
        setEpisodes(episodes);
      });
  }, []);

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
