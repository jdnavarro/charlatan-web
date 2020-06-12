/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import {
  Toolbar,
  AppBar,
  Fab,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import { Audio } from "./Audio";
import type * as current from "./current";
import { Current } from "./Current";
import type { Episodes } from "./queue";

interface Props {
  queue: Episodes;
  current: current.Episode;
  toggle: () => void;
  setProgress: (n: number) => void;
  enqueue: (id: string, pos?: number | null) => void;
}

export const Player: React.FC<Props> = (props) => {
  const { queue, enqueue, current, toggle, setProgress } = props;

  const [duration, setDuration] = React.useState(0);

  const [seekTime, setSeekTime] = React.useState<number | null>(null);

  const [currentDrawer, setCurrentDrawer] = React.useState(false);

  const openCurrent = (): void => {
    setCurrentDrawer(true);
  };

  const closeCurrent = (): void => {
    setCurrentDrawer(false);
  };

  const handlePlaying = (e: any) => {
    e.stopPropagation();
    toggle();
  };

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        color="primary"
        onClick={openCurrent}
        css={{
          top: "auto",
          bottom: 0,
        }}
      >
        <React.Fragment>
          <LinearProgress
            color="secondary"
            value={(current.progress / duration) * 100}
            variant="determinate"
          />
          <Toolbar>
            <Typography variant="h6">{current.title}</Typography>
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
              {current.playing ? <PauseIcon /> : <PlayArrowIcon />}
            </Fab>
            <Audio
              current={current}
              setProgress={setProgress}
              setDuration={setDuration}
              seekTime={seekTime}
              setSeekTime={setSeekTime}
            />
          </Toolbar>
        </React.Fragment>
      </AppBar>
      <Current
        closeCurrent={closeCurrent}
        drawer={currentDrawer}
        current={current}
        toggle={toggle}
        duration={duration}
        setSeekTime={setSeekTime}
        queue={queue}
        enqueue={enqueue}
      />
    </React.Fragment>
  );
};
