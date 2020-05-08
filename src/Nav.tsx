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
import AppsIcon from "@material-ui/icons/Apps";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

const ListItemLink = (props: ListItemLinkProps) => {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<any, "to">>((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
};

interface NavProps {
  drawerHandler: () => void;
  drawerState: boolean;
}

export default (props: NavProps) => (
  <Drawer onClick={props.drawerHandler} open={props.drawerState}>
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
