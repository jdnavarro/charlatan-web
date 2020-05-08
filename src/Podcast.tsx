import React from "react";

import { Toolbar, TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import TopBar from "./TopBar";

interface PodcastProps {
  drawerHandler: () => void;
  path: string;
}

export default (props: PodcastProps) => {
  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleSubmit = () => {
    fetch("http://127.0.0.1:3030/podcasts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, url: url }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <React.Fragment>
      <TopBar drawerHandler={props.drawerHandler} />

      <main>
        <Toolbar />
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="podcast-name"
            label="Podcast Name"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="podcast-url"
            label="Podcast URL"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Add
          </Button>
        </form>
      </main>
    </React.Fragment>
  );
};
