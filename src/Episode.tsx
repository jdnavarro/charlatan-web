import React from "react";

import { Toolbar, ListItem, ListItemText, List } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import TopBar from "./TopBar";

export default (props: any) => {
  const { drawerHandler, currentEpisode, setCurrentEpisode } = props;
  const [episodes, setEpisodes] = React.useState([]);

  React.useEffect(() => {
    fetch("/episodes")
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data);
      });
  }, []);

  const EpisodeItem = (props: any) => {
    const { id, title, src } = props;
    return (
      <ListItem>
        <ListItemText primary={title} />
        {id === currentEpisode.id ? (
          <RemoveIcon />
        ) : (
          <AddIcon
            onClick={() =>
              setCurrentEpisode({ id: id, title: title, src: src })
            }
          />
        )}
      </ListItem>
    );
  };

  return (
    <React.Fragment>
      <TopBar drawerHandler={drawerHandler} title="Episodes" />
      <main>
        <Toolbar />
        <List>
          {episodes.map((item: any) => (
            <EpisodeItem id={item.id} title={item.title} src={item.url} />
          ))}
        </List>
      </main>
    </React.Fragment>
  );
};
