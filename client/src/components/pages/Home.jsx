import React from "react";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  return isAuthenticated ? (
    <Redirect to="/boards" />
  ) : (
    <Redirect to="/sign-up" />
  );
};

export default Home;
