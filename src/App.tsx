import React from "react";
import { Router } from "@reach/router";

import { Container, CssBaseline } from "@material-ui/core";

import Nav from "./Nav";
import Podcasts from "./Podcast";
import Episodes from "./Episode";
import Player from "./Player";

export default () => {
  const [open, setOpen] = React.useState(false);
  const [currentEpisode, setCurrentEpisode] = React.useState({
    id: 9,
    title: "#1464 - Duncan Trussell",
    src: "http://traffic.libsyn.com/joeroganexp/p1464.mp3?dest-id=19997",
  });

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
          <Episodes
            path="/"
            drawerHandler={handleDrawerOpen}
            currentEpisode={currentEpisode}
            setCurrentEpisode={setCurrentEpisode}
          />
          <Podcasts path="podcasts" drawerHandler={handleDrawerOpen} />
        </Router>
        <Player currentEpisode={currentEpisode} />
      </Container>
    </React.Fragment>
  );
};
