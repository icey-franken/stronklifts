import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const needLogin = useSelector((state) => !state.auth.id);
  const { hasWorkouts } = useSelector((state) => state.workouts);
  const { workoutsLoaded } = useSelector((state) => state.workouts);
  const history = useHistory();

  //same logic for protected route and protected route new:
  // if user isn't logged in, send to login page
  // else if workouts aren't loaded, wait
  // else if user has no workouts, send to new lifter form
  // else (if user logged in, workouts loaded, and user has workouts) send to desired component
  console.log(needLogin, workoutsLoaded, hasWorkouts);
  if (needLogin) {
    history.replace("/login");
  } else if (!workoutsLoaded) {
    return null;
  } else if (!hasWorkouts) {
    history.replace("/newLifterForm");
  }

  return <Route {...rest} component={Component} />;
};

export const ProtectedRouteNew = ({ component: Component, ...rest }) => {
  const needLogin = useSelector((state) => !state.auth.id);
  const { hasWorkouts } = useSelector((state) => state.workouts);
  const { workoutsLoaded } = useSelector((state) => state.workouts);
  const history = useHistory();
  console.log(needLogin, workoutsLoaded, hasWorkouts);

  return needLogin ? (
    history.replace("/login")
  ) : !workoutsLoaded ? null : hasWorkouts ? (
    history.replace("/calendar")
  ) : (
    <Route {...rest} component={Component} />
  );
};
