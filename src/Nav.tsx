import React from "react";
import { Link } from "@reach/router";

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Apps as AppsIcon,
  FormatListBulleted as FormatListBulletedIcon,
} from "@material-ui/icons";

interface NavProps {
  closeDrawer: () => void;
  drawer: boolean;
}

export const Nav: React.FC<NavProps> = (props) => {
  const { closeDrawer, drawer } = props;
  return (
    <Drawer onClick={closeDrawer} open={drawer}>
      <Divider />
      <List>
        <ListItemLink
          to="/"
          primary="Episodes"
          icon={<FormatListBulletedIcon />}
        />
        <ListItemLink to="/podcasts" primary="Podcasts" icon={<AppsIcon />} />
      </List>
    </Drawer>
  );
};

interface ListItemLinkProps {
  primary: string;
  to: string;
  icon: React.ReactElement;
}

const ListItemLink: React.FC<ListItemLinkProps> = (props) => {
  const { primary, to, icon } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<any, "to">>((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem button component={renderLink}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
};
