/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";

import { Menu as MenuIcon, Refresh as RefreshIcon } from "@material-ui/icons";

import * as api from "./api";
import { AuthContext } from "./auth/context";

interface Props {
  openDrawer: () => void;
  title: string;
}

export const TopBar: React.FC<Props> = (props) => {
  const { openDrawer, title } = props;

  const { token } = React.useContext(AuthContext);

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
        <IconButton
          color="inherit"
          aria-label="refresh"
          onClick={() => api.refresh(token)}
          css={{
            position: "absolute",
            margin: "0 auto",
            right: "5%",
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
