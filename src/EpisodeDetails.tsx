import React from "react";
import type { Details } from "./feed";

import { Drawer } from "@material-ui/core";

interface Props {
  drawer: boolean;
  closeEpisodeDetails: () => void;
  details: Details;
}

export const EpisodeDetails: React.FC<Props> = (props) => {
  const { closeEpisodeDetails, drawer, details } = props;

  return (
    <Drawer
      onClick={closeEpisodeDetails}
      open={drawer}
      anchor="right"
      variant="temporary"
    >
      {details.notes}
    </Drawer>
  );
};
