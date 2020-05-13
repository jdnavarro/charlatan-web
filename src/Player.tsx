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

import { useAudioPlayer } from "./useAudioPlayer";
import { Episode } from "./episode";

export const Player: React.FC<{ currentEpisode: Episode }> = (props) => {
  const { title, src } = props.currentEpisode;

  const {
    playing,
    setPlaying,
    curTime,
    duration,
    setSeekTime,
  } = useAudioPlayer();

  const handleSeek = (event: any, newValue: number | number[]) => {
    setSeekTime(newValue as number);
  };

  return (
    <ElevationScroll>
      <AppBar
        position="fixed"
        color="primary"
        css={{
          top: "auto",
          bottom: 0,
        }}
      >
        <Slider
          value={curTime}
          max={duration}
          aria-labelledby="continuous-slider"
          color="secondary"
          onChange={handleSeek}
        />
        <Toolbar>
          <audio id="audio" preload="none" src={src}></audio>
          <Typography variant="h6">{title}</Typography>
          <Fab
            color="secondary"
            aria-label="play"
            css={{
              position: "absolute",
              zIndex: 1,
              right: "5%",
              margin: "0 auto",
            }}
            onClick={() => (playing ? setPlaying(false) : setPlaying(true))}
          >
            {playing ? <PauseIcon /> : <PlayArrowIcon />}
          </Fab>
        </Toolbar>
      </AppBar>
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
