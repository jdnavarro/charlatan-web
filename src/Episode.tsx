import React from "react";

import { Toolbar, ListItem, ListItemText, List } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import TopBar from "./TopBar";

interface EpisodeItemProp {
  id: string;
  title: string;
  icon: React.ReactElement;
}

const EpisodeItem = (props: EpisodeItemProp) => {
  const { title, icon } = props;
  return (
    <ListItem>
      <ListItemText primary={title} />
      {icon}
    </ListItem>
  );
};

interface PlayStatus {
  episode?: string;
}

interface EpisodesProps {
  drawerHandler: () => void;
  path: string;
  playing: PlayStatus;
  setPlaying: (p: PlayStatus) => void;
}

export default (props: any) => {
  const { drawerHandler, playing, setPlaying } = props;

  const [episodes, setEpisodes] = React.useState([]);

  const playingIcon = (episode_id: string) => {
    if (episode_id === playing.episode) {
      return <PauseIcon onClick={() => setPlaying({ episode: null })} />;
    } else {
      return (
        <PlayArrowIcon onClick={() => setPlaying({ episode: episode_id })} />
      );
    }
  };

  React.useEffect(() => {
    fetch("/episodes")
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data);
      });
  }, []);

  return (
    <React.Fragment>
      <TopBar drawerHandler={drawerHandler} title="Episodes" />
      <main>
        <Toolbar />
        <List>
          {episodes.map((item: EpisodeItemProp) => (
            <EpisodeItem
              id={item.id}
              title={item.title}
              icon={playingIcon(item.id)}
            />
          ))}
        </List>
      </main>
    </React.Fragment>
  );
};
