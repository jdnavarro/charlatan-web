import React from "react";
import type { Details } from "./feed";

import { Avatar, Drawer, Typography, Box } from "@material-ui/core";

interface Props {
  drawer: boolean;
  closeEpisodeDetails: () => void;
  details: Details;
}

// export const formatPublication = (timestamp: number): string =>
//   new Date(Number(timestamp * 1000)).toDateString();
//
export const EpisodeDetails: React.FC<Props> = (props) => {
  const { closeEpisodeDetails, drawer, details } = props;

  return (
    <Drawer
      onClick={closeEpisodeDetails}
      open={drawer}
      anchor="right"
      variant="temporary"
    >
      <Box
        css={{
          display: "flex",
        }}
      >
        <Avatar alt={details.id} src={details.image.toString()} />
        <Typography variant="subtitle2">
          {formatPublication(details.publication)}
        </Typography>
      </Box>
      <Typography variant="h5" component="h1">
        {details.title}
      </Typography>
      <Typography variant="subtitle2">
        {formatDuration(details.duration)}
      </Typography>
      <Typography>{details.notes}</Typography>
    </Drawer>
  );
};

export const formatPublication = (timestamp: number): string =>
  new Date(Number(timestamp * 1000)).toDateString();

export const formatDuration = (duration: number): string =>
  new Date(Number(duration * 1000)).toISOString().substr(11, 8);
