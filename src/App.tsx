/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { Router } from "@reach/router";

import { Container, CssBaseline } from "@material-ui/core";

import Nav from "./Nav";
import Podcasts from "./Podcast";
import Episodes from "./Episodes";

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
        <Nav onClick={handleDrawerClose} open={open} />
        <Router>
          <Episodes path="/" onClick={handleDrawerOpen} />
          <Podcasts path="podcasts" onClick={handleDrawerOpen} />
        </Router>
      </Container>
    </React.Fragment>
  );
};
