import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

const LeftDrawer = ({ open, setOpen }) => {
  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <List>
        <ListItem button onClick={() => setOpen(false)}>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button onClick={() => setOpen(false)}>
          <ListItemText>Page 2</ListItemText>
        </ListItem>
        <ListItem button onClick={() => setOpen(false)}>
          <ListItemText>Page 3</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
