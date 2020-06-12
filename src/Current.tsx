/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import {
  Drawer,
  Fab,
  Slider,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core";

import {
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  PlaylistPlay as QueueIcon,
} from "@material-ui/icons";

import { Queue } from "./Queue";

import type * as current from "./current";
import type * as queue from "./queue";

interface Props {
  drawer: boolean;
  closeCurrent: () => void;
  current: current.Episode;
  toggle: () => void;
  duration: any;
  setSeekTime: (n: any) => void;
  queue: queue.Episodes;
  enqueue: (id: string, pos?: number | null) => void;
}

export const Current: React.FC<Props> = (props) => {
  const [queueDrawer, setQueueDrawer] = React.useState(false);

  const {
    closeCurrent,
    drawer,
    current,
    toggle,
    duration,
    setSeekTime,
    queue,
    enqueue,
  } = props;

  const openQueue = (e: any): void => {
    e.stopPropagation();
    setQueueDrawer(true);
  };

  const closeQueue = (e: any): void => {
    e.stopPropagation();
    setQueueDrawer(false);
  };
  const handleSeek = (e: any, newValue: number | number[]) => {
    e.stopPropagation();
    setSeekTime(newValue as number);
  };

  const handlePlaying = (e: any) => {
    e.stopPropagation();
    toggle();
  };

  return (
    <Drawer onClick={closeCurrent} open={drawer} anchor="bottom">
      <img
        alt={current.id}
        src={current.image.toString()}
        css={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
      <Typography variant="h5" component="h1" align="center">
        {current.title}
      </Typography>
      <Fab
        color="secondary"
        aria-label="play"
        css={{
          margin: "0 auto",
        }}
        onClick={handlePlaying}
      >
        {current.playing ? <PauseIcon /> : <PlayArrowIcon />}
      </Fab>
      <Slider
        value={current.progress}
        max={duration}
        aria-labelledby="continuous-slider"
        color="secondary"
        onChange={handleSeek}
      />
      <Box
        css={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption">
          {formatProgress(current.progress)}
        </Typography>
        <Typography variant="caption">
          {"- " + formatRemaining(current.progress, duration)}
        </Typography>
      </Box>
      <IconButton onClick={openQueue}>
        <QueueIcon />
      </IconButton>
      <Queue
        closeQueue={closeQueue}
        drawer={queueDrawer}
        episodes={queue}
        enqueue={enqueue}
      />
    </Drawer>
  );
};

const formatProgress = (duration: number): string =>
  new Date(Number(duration * 1000)).toISOString().substr(11, 8);

const formatRemaining = (progress: number, duration: number): string => {
  const remain = duration - progress;
  return new Date(Number(remain * 1000)).toISOString().substr(11, 8);
};
