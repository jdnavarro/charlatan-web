import React from "react";

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

import { Podcast } from "./podcast";

interface Props {
  podcast: Podcast;
}

export const Item: React.FC<Props> = (props) => {
  const { podcast } = props;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={podcast.id} src={podcast.image.toString()} />
      </ListItemAvatar>
      <ListItemText primary={podcast.title} />
    </ListItem>
  );
};
