import React from "react";
import { Router } from "@reach/router";

import { Container, CssBaseline } from "@material-ui/core";

import { Nav } from "./Nav";
import Podcasts from "./Podcast";
import { Episodes } from "./Episode";
import { Episode } from "./episode";
import { Player } from "./Player";

export const App: React.FC = () => {
  const [drawer, setDrawer] = React.useState<boolean>(false);

  const [currentEpisode, setCurrentEpisode] = React.useState<Episode>({
    id: 3,
    title: "#1474 - Dr. Rhonda Patrick",
    src: "http://traffic.libsyn.com/joeroganexp/p1474.mp3?dest-id=19997",
    progress: 5000,
  });

  const openDrawer = (): void => {
    setDrawer(true);
  };

  const closeDrawer = (): void => {
    setDrawer(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Nav closeDrawer={closeDrawer} drawer={drawer} />
        <Router>
          <Episodes
            path="/"
            openDrawer={openDrawer}
            currentEpisode={currentEpisode}
            setCurrentEpisode={setCurrentEpisode}
          />
          <Podcasts path="podcasts" openDrawer={openDrawer} />
        </Router>
        <Player
          currentEpisode={currentEpisode}
          setCurrentEpisode={setCurrentEpisode}
        />
      </Container>
    </React.Fragment>
  );
};
