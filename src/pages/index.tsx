import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import InboxIcon from "@material-ui/icons/Inbox"
import MenuIcon from "@material-ui/icons/Menu"
import React from "react"
import Divider from "@material-ui/core/Divider"
import { css } from "@emotion/core"

export default () => {
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  return (
    <Container
      maxWidth="sm"
      css={css`
        display: "flex";
      `}
    >
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Podcasts</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={open}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Podcasts" />
          </ListItem>
        </List>
      </Drawer>
    </Container>
  )
}
