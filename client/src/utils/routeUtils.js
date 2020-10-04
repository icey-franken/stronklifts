import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const needLogin = useSelector((state) => !state.auth.id);
  const { hasWorkouts } = useSelector((state) => state.workouts);
  const history = useHistory();

  //same logic for protected route and protected route new:
  // if user isn't logged in, send to login page
  // else if workouts aren't loaded, wait
  // else if user has no workouts, send to new lifter form
  // else (if user logged in, workouts loaded, and user has workouts) send to desired component

  // useEffect(() => {
  //   if (needLogin) {
  //     history.replace("/login");
  //   }
	// }, [needLogin]);
	console.log(hasWorkouts, needLogin);

  if (needLogin) {
    history.replace("/login");
  } else if (!hasWorkouts) {
    history.replace("/newLifterForm");
  }

  return <Route {...rest} component={Component} />;
};
