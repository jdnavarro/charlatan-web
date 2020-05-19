import React from "react";

import { Toolbar, TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import { TopBar } from "./TopBar";
import { API } from "./api";

interface Props {
  openDrawer: () => void;
  path: string;
}

export default (props: Props) => {
  const { openDrawer } = props;

  const [url, setUrl] = React.useState("");

  const handleSubmit = (): void => {
    API.podcast(url);
  };

  return (
    <React.Fragment>
      <TopBar openDrawer={openDrawer} title="Podcasts" />

      <main>
        <Toolbar />
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
          onClick={handleSubmit}
        >
          Add
        </Button>
      </main>
    </React.Fragment>
  );
};
