import React, { useContext, Fragment } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Home from "@material-ui/icons/Home";
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Dns from "@material-ui/icons/Dns";
import AuthContext from "../../context/auth/authContext";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  textDecorationNone: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const LeftDrawer = ({ open, setOpen }) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      classes={{ paper: classes.drawerPaper }}
    >
      <List>
        <Link className={classes.textDecorationNone} to="/">
          <ListItem button onClick={() => setOpen(false)}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        {isAuthenticated ? (
          <Fragment>
            <Link className={classes.textDecorationNone} to="/boards">
              <ListItem
                className={classes.listItem}
                button
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <Dns />
                </ListItemIcon>
                <ListItemText primary="Boards" />
              </ListItem>
            </Link>
            <Link
              className={classes.textDecorationNone}
              to="#"
              onClick={logout}
            >
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link className={classes.textDecorationNone} to="/sign-in">
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <AssignmentTurnedIn />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
            <Link className={classes.textDecorationNone} to="/sign-up">
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <AssignmentInd />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            </Link>
          </Fragment>
        )}
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
