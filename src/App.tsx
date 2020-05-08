/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";

import { Container, CssBaseline } from "@material-ui/core";

import Nav from "./Nav";
import Podcast from "./Podcast";

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
        <Podcast onClick={handleDrawerOpen} />
      </Container>
    </React.Fragment>
  );
};
