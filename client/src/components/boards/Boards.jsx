import React from "react";
import { Switch, Route } from "react-router-dom";
import Board from "./Board";

const Boards = ({ match }) => {
  // const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:id`} component={Board} />
      <Route exact path={match.path} render={() => <h1>Select a board</h1>} />
    </Switch>
  );
};

export default Boards;
