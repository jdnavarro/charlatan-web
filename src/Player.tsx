/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import {
  Toolbar,
  AppBar,
  Fab,
  useScrollTrigger,
  Typography,
  Slider,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import { Audio } from "./Audio";
import { Episodes, CurrentEpisode } from "./episode";
import { Queue } from "./Queue";

interface Props {
  episodes: Episodes;
  setEpisodes: (episodes: Episodes) => void;
  currentEpisode: CurrentEpisode | null;
  setCurrentEpisode: (e: CurrentEpisode) => void;
}

export const Player: React.FC<Props> = (props) => {
  const { currentEpisode, setCurrentEpisode, episodes, setEpisodes } = props;

  const [duration, setDuration] = React.useState(0);

  const [seekTime, setSeekTime] = React.useState<number | null>(null);

  const [queue, setQueue] = React.useState(false);

  const openQueue = (): void => {
    setQueue(true);
  };

  const closeQueue = (): void => {
    setQueue(false);
  };

  const handleSeek = (_event: any, newValue: number | number[]) => {
    setSeekTime(newValue as number);
  };

  const handlePlaying = (e: any) => {
    e.stopPropagation();
    currentEpisode!.playing
      ? setCurrentEpisode({ ...currentEpisode!, playing: false })
      : setCurrentEpisode({ ...currentEpisode!, playing: true });
  };

  return (
    <ElevationScroll>
      <React.Fragment>
        <AppBar
          position="fixed"
          color="primary"
          onClick={openQueue}
          css={{
            top: "auto",
            bottom: 0,
          }}
        >
          {currentEpisode ? (
            <React.Fragment>
              <Slider
                value={currentEpisode!.progress}
                max={duration}
                aria-labelledby="continuous-slider"
                color="secondary"
                onChange={handleSeek}
              />
              <Toolbar>
                <Typography variant="h6">{currentEpisode!.title}</Typography>
                <Fab
                  color="secondary"
                  aria-label="play"
                  css={{
                    position: "absolute",
                    zIndex: 1,
                    right: "5%",
                    margin: "0 auto",
                  }}
                  onClick={handlePlaying}
                >
                  {currentEpisode.playing ? <PauseIcon /> : <PlayArrowIcon />}
                </Fab>
                <Audio
                  currentEpisode={currentEpisode}
                  setCurrentEpisode={setCurrentEpisode}
                  setDuration={setDuration}
                  seekTime={seekTime}
                  setSeekTime={setSeekTime}
                />
              </Toolbar>
            </React.Fragment>
          ) : null}
        </AppBar>
        <Queue
          closeQueue={closeQueue}
          queue={queue}
          episodes={episodes}
          setEpisodes={setEpisodes}
        />
      </React.Fragment>
    </ElevationScroll>
  );
};

const ElevationScroll: React.FC<{ children: React.ReactElement }> = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, { elevation: trigger ? 4 : 0 });
};
