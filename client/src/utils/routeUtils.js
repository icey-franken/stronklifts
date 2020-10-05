import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import NewLifterForm from "../components/NewLifterForm";


export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const needLogin = useSelector((state) => !state.auth.id);
  const { hasWorkouts } = useSelector((state) => state.workouts);

  //same logic for protected route and protected route new:
  // if user isn't logged in, send to login page
  // else if workouts aren't loaded, wait
  // else if user has no workouts, send to new lifter form
  // else (if user logged in, workouts loaded, and user has workouts) send to desired component
  console.log(needLogin, !hasWorkouts, Component, rest);
  return needLogin ? (
    <Redirect to="/login" />
  ) : !hasWorkouts ? (
    <Redirect to="/newLifterForm" component={NewLifterForm} />
  ) : (
    <Route {...rest} component={Component} />
  );
};

export const AuthRoute = ({ component: Component, ...rest }) => {
  const needLogin = useSelector((state) => !state.auth.id);

  return needLogin ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/history" />
  );
};
