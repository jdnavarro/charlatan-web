/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import { Toolbar, AppBar, Fab, useScrollTrigger } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const ElevationScroll = (props: any) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, { elevation: trigger ? 4 : 0 });
};

export default () => {
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
            <PlayArrowIcon />
          </Fab>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};
