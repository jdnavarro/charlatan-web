import React from "react";
import { Router } from "@reach/router";

import { Container, CssBaseline } from "@material-ui/core";

import { Nav } from "./Nav";
import Podcasts from "./Podcast";
import { Feed } from "./Feed";
import { CurrentEpisode, Episode, Episodes } from "./episode";
import { Player } from "./Player";
import { API } from "./api";

export const App: React.FC = () => {
  const [drawer, setDrawer] = React.useState<boolean>(false);

  const [episodes, setEpisodes] = React.useState<Episodes>({});

  React.useEffect(() => {
    API.episodes(setEpisodes);
  }, []);

  const [
    currentEpisode,
    setCurrentEpisode,
  ] = React.useState<CurrentEpisode | null>(null);

  React.useEffect(() => {
    if (currentEpisode !== null) {
      API.progress(currentEpisode!);
    }
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
          <Feed
            path="/"
            openDrawer={openDrawer}
            currentEpisode={currentEpisode}
            setCurrentEpisode={setCurrentEpisode}
            episodes={episodes}
            setEpisodes={setEpisodes}
          />
          <Podcasts path="podcasts" openDrawer={openDrawer} />
        </Router>
        <Player
          episodes={episodes}
          setEpisodes={setEpisodes}
          currentEpisode={currentEpisode}
          setCurrentEpisode={setCurrentEpisode}
        />
      </Container>
    </React.Fragment>
  );
};
