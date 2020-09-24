import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./AuthPage";
import { ProtectedRoute } from "../utils/routeUtils";
import { useSelector } from "react-redux";
import ActiveWorkoutPage from "./ActiveWorkoutPage";
import WorkoutHistoryPage from './WorkoutHistoryPage';

export default function Pages() {

  const needLogin = useSelector((state) => !state.auth.id);

  return (
      <Switch>
        <Route path={["/login", "/signup"]} component={AuthPage} />
        <ProtectedRoute
          path="/history"
          exact={true}
          needLogin={needLogin}
          component={WorkoutHistoryPage}
        />
				<ProtectedRoute
          path="/workout"
          exact={true}
          needLogin={needLogin}
          component={ActiveWorkoutPage}
        />
      </Switch>
  );
}
