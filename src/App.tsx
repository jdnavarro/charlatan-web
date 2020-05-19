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

  const [currentEpisode, setCurrentEpisode] = React.useState<Episode | null>(
    null
  );

  React.useEffect(() => {
    (async () => {
      if (currentEpisode !== null) {
        const progress = currentEpisode!.progress;
        await fetch(`/episodes/${currentEpisode?.id}/progress`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Math.round(progress)),
        });
      }
    })();
  }, [currentEpisode]);

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
