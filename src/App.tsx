import React from "react";
import { Router } from "@reach/router";

import { enableMapSet } from "immer";

import { CssBaseline } from "@material-ui/core";

import { Nav } from "./Nav";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { AuthContext } from "./auth/context";
import { Podcasts } from "./podcast/Podcasts";
import { Feed } from "./Feed";
import { Player } from "./Player";
import { useEpisodes } from "./useEpisodes";

enableMapSet();

export const App: React.FC = () => {
  const [drawer, setDrawer] = React.useState<boolean>(false);

  const prevToken = window.localStorage.getItem("token") || "";

  const [token, setToken] = React.useState<string>(prevToken);

  React.useEffect(() => {
    if (token !== "") localStorage.setItem("token", token);
  }, [token]);

  const {
    feed,
    queue,
    enqueue,
    current,
    toggle,
    setProgress,
    details,
  } = useEpisodes(token);

  const openDrawer = (): void => {
    setDrawer(true);
  };

  const closeDrawer = (): void => {
    setDrawer(false);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
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
          <Login path="login" />
          <Register path="register" />
        </Router>
        {current ? (
          <Player
            queue={queue}
            enqueue={enqueue}
            current={current}
            toggle={toggle}
            setProgress={setProgress}
          />
        ) : null}
      </React.Fragment>
    </AuthContext.Provider>
  );
};
