import React from "react";

import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

interface TopBarProps {
    drawerHandler: () => void;
    title: string;
}

export default (props: any) => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={props.drawerHandler}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">{props.title}</Typography>
      </Toolbar>
    </AppBar>
  );
};
