import React from "react";

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Remove as RemoveIcon } from "@material-ui/icons";

import { Podcast } from "./podcast";

interface Props {
  podcast: Podcast;
  remove: (id: string) => void;
}

export const Item: React.FC<Props> = (props) => {
  const { podcast, remove } = props;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={podcast.id.toString()} src={podcast.image.toString()} />
      </ListItemAvatar>
      <ListItemText primary={podcast.title} />
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => {
            remove(podcast.id);
          }}
        >
          <RemoveIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
