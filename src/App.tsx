import React from "react";
import { Router } from "@reach/router";

import { enableMapSet } from "immer";

import { CssBaseline } from "@material-ui/core";

import { Nav } from "./Nav";
import Podcasts from "./Podcast";
import { Feed } from "./Feed";
import { Player } from "./Player";
import { useEpisodes } from "./useEpisodes";

enableMapSet();

export const App: React.FC = () => {
  const [drawer, setDrawer] = React.useState<boolean>(false);

  const {
    feed,
    queue,
    enqueue,
    current,
    toggle,
    setProgress,
    details,
  } = useEpisodes();

  const openDrawer = (): void => {
    setDrawer(true);
  };

  const closeDrawer = (): void => {
    setDrawer(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Nav closeDrawer={closeDrawer} drawer={drawer} />
      <Router>
        <Feed
          path="/"
          openDrawer={openDrawer}
          episodes={feed}
          enqueue={enqueue}
          details={details}
        />
        <Podcasts path="podcasts" openDrawer={openDrawer} />
      </Router>
      <Player
        queue={queue}
        enqueue={enqueue}
        current={current}
        toggle={toggle}
        setProgress={setProgress}
      />
    </React.Fragment>
  );
};
