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
import type * as Current from "./current";
import type { Episodes } from "./queue";
import { Queue } from "./Queue";

interface Props {
  queue: Episodes;
  current: Current.Episode | null;
  toggle: () => void;
  setProgress: (n: number) => void;
  enqueue: (id: string, pos?: number | null) => void;
}

export const Player: React.FC<Props> = (props) => {
  const { queue, enqueue, current, toggle, setProgress } = props;

  const [duration, setDuration] = React.useState(0);

  const [seekTime, setSeekTime] = React.useState<number | null>(null);

  const [queueDrawer, setQueueDrawer] = React.useState(false);

  const openQueue = (): void => {
    setQueueDrawer(true);
  };

  const closeQueue = (): void => {
    setQueueDrawer(false);
  };

  const handleSeek = (_event: any, newValue: number | number[]) => {
    setSeekTime(newValue as number);
  };

  const handlePlaying = (e: any) => {
    e.stopPropagation();
    toggle();
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
          {current ? (
            <React.Fragment>
              <Slider
                value={current.progress}
                max={duration}
                aria-labelledby="continuous-slider"
                color="secondary"
                onChange={handleSeek}
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
          ) : null}
        </AppBar>
        <Queue
          closeQueue={closeQueue}
          drawer={queueDrawer}
          episodes={queue}
          enqueue={enqueue}
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
