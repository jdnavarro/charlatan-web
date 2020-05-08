import React from "react";

import { Toolbar } from "@material-ui/core";

import TopBar from "./TopBar";

export default (props: any) => {
  return (
    <React.Fragment>
      <TopBar onClick={props.onClick} title="Episodes" />
      <main>
        <Toolbar />
        <p>Hola</p>
      </main>
    </React.Fragment>
  );
};
