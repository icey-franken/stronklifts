import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./AuthPage";
import { ProtectedRoute } from "../utils/routeUtils";
import { useSelector } from "react-redux";
import WorkoutPage from "./WorkoutPage";
import NewWorkoutPage from "./NewWorkoutPageContainer";

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
				{/* change to /workout/new later */}
				<ProtectedRoute
          path="/workout"
          exact={true}
          needLogin={needLogin}
          component={NewWorkoutPage}
        />
				<ProtectedRoute
          path="/workout/edit/:id"
          exact={true}
          needLogin={needLogin}
          component={WorkoutPage}
        />
      </Switch>
  );
}
