import React from "react";

import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

interface Props {
  queue: boolean;
  closeQueue: () => void;
}

export const Queue: React.FC<Props> = (props) => {
  const { closeQueue, queue } = props;
  return (
    <Drawer onClick={closeQueue} open={queue} anchor="bottom">
      <List>
        <ListItem>
          <ListItemText primary="Episode in queue"></ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};
