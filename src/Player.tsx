/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import {
  Toolbar,
  AppBar,
  Fab,
  useScrollTrigger,
  Typography,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import useAudioPlayer from "./useAudioPlayer";

const ElevationScroll = (props: any) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, { elevation: trigger ? 4 : 0 });
};

export default (props: any) => {
  const { title, src } = props.currentEpisode;
  const { playing, setPlaying } = useAudioPlayer();
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
          >
            {playing ? (
              <PauseIcon onClick={() => setPlaying(false)} />
            ) : (
              <PlayArrowIcon onClick={() => setPlaying(true)} />
            )}
          </Fab>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};
