import React, { useContext } from "react";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Grid, Hidden } from "@material-ui/core";

// Context
import AuthConntext from "../../context/auth/authContext";

const useStyles = makeStyles((theme) => ({
  flex: {
    flex: 1,
  },
  widthAuto: {
    width: "auto",
  },
  iconBtn: {
    marginRight: theme.spacing(2),
  },
  username: {
    marginRight: theme.spacing(1),
  },
  toolbarMargin: theme.mixins.toolbar,
}));

const NavBar = ({ openDrawer }) => {
  const classes = useStyles();

  const authContext = useContext(AuthConntext);
  const { user } = authContext;

  return (
    <Appbar position="relative">
      <Toolbar>
        <IconButton
          className={classes.iconBtn}
          color="inherit"
          aria-label="Menu"
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          Retrospective App
        </Typography>
        {/* <Button color="inherit">Login</Button> */}

        <Grid container alignItems="center" className={classes.widthAuto}>
          <Grid item>
            <Hidden only="xs">
              {user && (
                <Typography className={classes.username}>
                  {user.name}
                </Typography>
              )}
            </Hidden>
          </Grid>
          <Grid item>
            <Avatar src={user && user.photo ? user.photo : ""}>
              {user
                ? user.name
                    .match(/\b(\w)/g)
                    .map((ch, i) => {
                      if (i < 2) return ch;
                      else return "";
                    })
                    .join("")
                : "@"}
            </Avatar>
          </Grid>
        </Grid>
      </Toolbar>
    </Appbar>
  );
};

export default NavBar;
