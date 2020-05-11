import React from "react";

import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

interface Props {
  openDrawer: () => void;
  title: string;
}

export const TopBar: React.FC<Props> = (props) => {
  const { openDrawer, title } = props;
  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};
