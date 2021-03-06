import React from "react";

import { Toolbar, TextField, Button, List } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import { TopBar } from "../TopBar";
import { usePodcasts } from "./usePodcasts";
import * as api from "./api";
import { Item } from "./Item";
import { AuthContext } from "../auth/context";

interface Props {
  openDrawer: () => void;
  path: string;
}

export const Podcasts = (props: Props) => {
  const { token } = React.useContext(AuthContext);

  const { podcasts, remove } = usePodcasts(token);

  const { openDrawer } = props;

  const [url, setUrl] = React.useState("");

  const handleSubmit = (): void => {
    api.add(token, url);
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

        <List>
          {podcasts.map((podcast, key) => (
            <React.Fragment key={key}>
              <Item podcast={podcast} remove={remove} />
            </React.Fragment>
          ))}
        </List>
      </main>
    </React.Fragment>
  );
};
