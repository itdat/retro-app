import React from "react";
import { match } from "react-router-dom";

const Board = ({ match }) => {
  return (
    <div>
      <h1>Board id {match.params.id}</h1>
    </div>
  );
};

export default Board;
