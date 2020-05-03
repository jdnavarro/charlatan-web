import React from "react";

import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

export default (props: any) => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={props.onClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Podcasts</Typography>
      </Toolbar>
    </AppBar>
  );
};
