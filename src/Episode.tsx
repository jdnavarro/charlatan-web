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

  const playingIcon = (episode_id: string, url: string) => {
    if (episode_id === playing.episode) {
      return (
        <PauseIcon
          onClick={() => {
            playing.audio.pause();
            setPlaying({ episode: null, audio: null });
          }}
        />
      );
    } else {
      return (
        <PlayArrowIcon
          onClick={() => {
            let audioElement = new Audio(url);
            setPlaying({ episode: episode_id, audio: audioElement });
            console.log(playing);
            audioElement.play();
          }}
        />
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
          {episodes.map((item: any) => (
            <EpisodeItem
              id={item.id}
              title={item.title}
              icon={playingIcon(item.id, item.url)}
            />
          ))}
        </List>
      </main>
    </React.Fragment>
  );
};
