import React from "react";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Grid } from "@material-ui/core";

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

const Navbar = () => {
  const classes = useStyles();
  return (
    <Appbar position="relative">
      <Toolbar>
        <IconButton
          className={classes.iconBtn}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          Retrospective App
        </Typography>
        {/* <Button color="inherit">Login</Button> */}

        <Grid container alignItems="center" className={classes.widthAuto}>
          <Grid item>
            <Typography className={classes.username}>Username</Typography>
          </Grid>
          <Grid item>
            <Avatar>TD</Avatar>
          </Grid>
        </Grid>
      </Toolbar>
    </Appbar>
  );
};

export default Navbar;
