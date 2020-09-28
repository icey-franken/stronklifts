import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
  component: Component,
	needLogin,
	hasWorkouts,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() =>
        needLogin ? (
          <Redirect to="/login" />
        ) : !hasWorkouts ? (
          <Redirect to="/newLifterForm" />
        ) : (
          <Component />
        )
      }
    />
  );
};

export const ProtectedRouteNew = ({
  component: Component,
	needLogin,
	hasWorkouts,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() => needLogin ? (
				<Redirect to="/login" />
			) : hasWorkouts ? (
				<Redirect to="/history" />
			) : (
				<Component />
			)}
    />
  );
};
