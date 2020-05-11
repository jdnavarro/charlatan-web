import React from "react";

import { Toolbar, ListItem, ListItemText, List } from "@material-ui/core";

import TopBar from "./TopBar";

interface EpisodeItemProp {
  id: string;
  title: string;
}

const EpisodeItem = (props: EpisodeItemProp) => {
  const { title } = props;
  return (
    <ListItem>
      <ListItemText primary={title} />
    </ListItem>
  );
};

export default (props: any) => {
  const { drawerHandler } = props;

  const [episodes, setEpisodes] = React.useState([]);

  React.useEffect(() => {
    fetch("/episodes")
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data);
      });
  }, []);

  return (
    <React.Fragment>
      <TopBar drawerHandler={drawerHandler} title="Episodes" />
      <main>
        <Toolbar />
        <List>
          {episodes.map((item: any) => (
            <EpisodeItem id={item.id} title={item.title} />
          ))}
        </List>
      </main>
    </React.Fragment>
  );
};
