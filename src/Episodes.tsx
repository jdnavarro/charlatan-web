import React from "react";

import { Toolbar, ListItem, ListItemText, List } from "@material-ui/core";

import TopBar from "./TopBar";

interface EpisodeItemProp {
  title: string;
}

const EpisodeItem = (props: EpisodeItemProp) => {
  return (
    <ListItem>
      <ListItemText primary={props.title} />
    </ListItem>
  );
};

interface EpisodesProps {
  drawerHandler: () => void;
  path: string;
}

export default (props: EpisodesProps) => {
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
      <TopBar drawerHandler={props.drawerHandler} title="Episodes" />
      <main>
        <Toolbar />
        <List>
          {episodes.map((item: any) => (
            <EpisodeItem title={item.title} />
          ))}
        </List>
      </main>
    </React.Fragment>
  );
};
