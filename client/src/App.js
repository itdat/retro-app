import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import clsx from "clsx";

import NavBar from "./components/layout/NavBar";
import LeftDrawer from "./components/layout/LeftDrawer";
import CardColumn from "./components/cards/CardColumn";
import ConfirmDialog from "./components/notification/ConfirmDialog";
import ConfirmDialogState from "./context/confirmDialog/ConfirmDialogState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Alerts from "./components/layout/Alerts";

const useStyles = makeStyles((theme) => ({
  columnTitle: {
    marginTop: "0.2rem",
    padding: "2rem",
  },
  wentWell: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.text.primary,
  },
  toImprove: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.text.primary,
  },
  actionItems: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.text.primary,
  },
}));

export default function App() {
  const classes = useStyles();

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Card columns state
  const [wentWell, setWentWell] = useState([]);
  const [toImprove, setToImprove] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  // Fetch data when components did mount
  useEffect(() => {
    const fetchData = async () => {
      const wentWellRes = await axios.get(
        `/api/cards?board=5fa24556601b321aa80ee16c&column=wentWell`
      );
      setWentWell(wentWellRes.data);
      const toImproveRes = await axios.get(
        `/api/cards?board=5fa24556601b321aa80ee16c&column=toImprove`
      );
      setToImprove(toImproveRes.data);
      const actionItemsRes = await axios.get(
        `/api/cards?board=5fa24556601b321aa80ee16c&column=actionItems`
      );
      setActionItems(actionItemsRes.data);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <AuthState>
        <AlertState>
          <ConfirmDialogState>
            <React.Fragment>
              <CssBaseline />
              <NavBar openDrawer={() => setDrawerOpen(!drawerOpen)} />
              <main>
                <LeftDrawer open={drawerOpen} setOpen={setDrawerOpen} />
                <Container maxWidth="md">
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => (
                        <Grid container spacing={1}>
                          <CardColumn
                            title="Went Well"
                            cards={wentWell}
                            setCards={setWentWell}
                            columnClasses={clsx(
                              classes.columnTitle,
                              classes.wentWell
                            )}
                          />
                          <CardColumn
                            title="To Improve"
                            cards={toImprove}
                            setCards={setToImprove}
                            columnClasses={clsx(
                              classes.columnTitle,
                              classes.toImprove
                            )}
                          />
                          <CardColumn
                            title="Action Items"
                            cards={actionItems}
                            setCards={setActionItems}
                            columnClasses={clsx(
                              classes.columnTitle,
                              classes.actionItems
                            )}
                          />
                        </Grid>
                      )}
                    />
                    <Route exact path="/sign-up" component={SignUp} />
                    <Route exact path="/sign-in" component={SignIn} />
                  </Switch>
                </Container>
                <ConfirmDialog />
              </main>
            </React.Fragment>
          </ConfirmDialogState>
          <Alerts />
        </AlertState>
      </AuthState>
    </Router>
  );
}
