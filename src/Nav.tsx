import React from "react";

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";

export default (props: any) => {
  return (
    <Drawer onClick={props.onClick} open={props.open}>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Podcasts" />
        </ListItem>
      </List>
    </Drawer>
  );
};
