import React from "react";
import { Router } from "@reach/router";

import { Container, CssBaseline } from "@material-ui/core";

import Nav from "./Nav";
import Podcasts from "./Podcast";
import Episodes from "./Episode";
import Player from "./Player";

export default () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Nav drawerHandler={handleDrawerClose} drawerState={open} />
        <Router>
          <Episodes path="/" drawerHandler={handleDrawerOpen} />
          <Podcasts path="podcasts" drawerHandler={handleDrawerOpen} />
        </Router>
        <Player />
      </Container>
    </React.Fragment>
  );
};
