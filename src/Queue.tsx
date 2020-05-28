import React from "react";

import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

import { Episodes, Episode } from "./queue";

interface Props {
  drawer: boolean;
  closeQueue: () => void;
  episodes: Episodes;
}

export const Queue: React.FC<Props> = (props) => {
  const { closeQueue, drawer, episodes } = props;
  return (
    <Drawer onClick={closeQueue} open={drawer} anchor="bottom">
      <List>
        {episodes.map((episode, key) => (
          <EpisodeItem key={key} episode={episode} />
        ))}
      </List>
    </Drawer>
  );
};

const EpisodeItem: React.FC<{ episode: Episode }> = (props) => {
  const { episode } = props;

  return (
    <ListItem>
      <ListItemText primary={episode.title} />
    </ListItem>
  );
};
