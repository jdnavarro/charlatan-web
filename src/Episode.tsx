import React from "react";

import { Toolbar, ListItem, ListItemText, List } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { Episode } from "./episode";
import { TopBar } from "./TopBar";

interface Props {
  path: string;
  openDrawer: () => void;
  currentEpisode: Episode;
  setCurrentEpisode: (episode: Episode) => void;
}

export const Episodes: React.FC<Props> = (props) => {
  const { openDrawer, currentEpisode, setCurrentEpisode } = props;

  const [episodes, setEpisodes] = React.useState<Array<Episode>>([]);

  React.useEffect(() => {
    fetch("/episodes")
      .then((response) => response.json())
      .then((data) => {
        const episodes = data.map((e: any) => {
          return {
            src: e.url,
            ...e,
          };
        });
        setEpisodes(episodes);
      });
  }, []);

  const EpisodeItem: React.FC<{ episode: Episode }> = (props) => {
    const { episode } = props;
    return (
      <ListItem>
        <ListItemText primary={episode.title} />
        {episode.id === currentEpisode.id ? (
          <RemoveIcon />
        ) : (
          <AddIcon onClick={() => setCurrentEpisode(episode)} />
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
          {episodes.map((item: Episode) => (
            <EpisodeItem episode={item} />
          ))}
        </List>
      </main>
    </React.Fragment>
  );
};
