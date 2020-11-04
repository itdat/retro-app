import React, { useContext, Fragment } from "react";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const LeftDrawer = ({ open, setOpen }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <List>
        <ListItem button onClick={() => setOpen(false)}>
          <ListItemText>
            <Link to="/">Home</Link>
          </ListItemText>
        </ListItem>
        {isAuthenticated && (
          <Fragment>
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
          </Fragment>
        )}
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
