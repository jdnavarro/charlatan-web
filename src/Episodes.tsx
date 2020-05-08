import React from "react";

import { Toolbar } from "@material-ui/core";

import TopBar from "./TopBar";

interface EpisodesProps {
  drawerHandler: () => void;
  path: string;
}

export default (props: EpisodesProps) => {
  return (
    <React.Fragment>
      <TopBar drawerHandler={props.drawerHandler} title="Episodes" />
      <main>
        <Toolbar />
        <p>Hola</p>
      </main>
    </React.Fragment>
  );
};
