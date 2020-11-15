import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Home from "./components/pages/Home";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import NavBar from "./components/layout/NavBar";
import LeftDrawer from "./components/layout/LeftDrawer";
import Alerts from "./components/layout/Alerts";
import Boards from "./components/boards/Boards";
import ConfirmDialog from "./components/notification/ConfirmDialog";

import setAuthToken from "./utils/setAuthToken";

// States
import ConfirmDialogState from "./context/confirmDialog/ConfirmDialogState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import CardsState from "./context/cards/CardsState";
import ColumnsState from "./context/columns/ColumnsState";
import BoardsState from "./context/boards/BoardsState";

setAuthToken(localStorage.token);

export default function App() {
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Router>
      <AuthState>
        <AlertState>
          <BoardsState>
            <ColumnsState>
              <CardsState>
                <ConfirmDialogState>
                  <React.Fragment>
                    <CssBaseline />
                    <NavBar openDrawer={() => setDrawerOpen(!drawerOpen)} />
                    <main>
                      <LeftDrawer open={drawerOpen} setOpen={setDrawerOpen} />
                      <Container maxWidth="md">
                        <Switch>
                          <Route exact path="/" component={Home} />
                          <Route path="/boards" component={Boards} />
                          <Route exact path="/sign-up" component={SignUp} />
                          <Route exact path="/sign-in" component={SignIn} />
                        </Switch>
                      </Container>
                      <ConfirmDialog />
                    </main>
                  </React.Fragment>
                </ConfirmDialogState>
                <Alerts />
              </CardsState>
            </ColumnsState>
          </BoardsState>
        </AlertState>
      </AuthState>
    </Router>
  );
}
