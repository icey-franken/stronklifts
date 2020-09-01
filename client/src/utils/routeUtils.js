import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
  component: Component,
  needLogin,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() => (needLogin ? <Redirect to="/login" /> : <Component />)}
    />
  );
};
