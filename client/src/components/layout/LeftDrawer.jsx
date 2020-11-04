import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";

const LeftDrawer = ({ open, setOpen }) => {
  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <List>
        <ListItem button onClick={() => setOpen(false)}>
          <ListItemText>
            <Link to="/">Home</Link>
          </ListItemText>
        </ListItem>
        <ListItem button onClick={() => setOpen(false)}>
          <ListItemText>
            <Link to="/sign-in">Login</Link>
          </ListItemText>
        </ListItem>
        <ListItem button onClick={() => setOpen(false)}>
          <ListItemText>
            <Link to="/sign-up">Sign up</Link>
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
