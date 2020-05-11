/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import { Toolbar, AppBar, Fab, useScrollTrigger } from "@material-ui/core";
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

export default () => {
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
          <audio id="audio" preload="none">
            <source src="http://traffic.libsyn.com/joeroganexp/p1464.mp3?dest-id=19997" />
          </audio>
          <Fab
            color="secondary"
            aria-label="play"
            css={{
              position: "absolute",
              zIndex: 1,
              left: 0,
              right: 0,
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
