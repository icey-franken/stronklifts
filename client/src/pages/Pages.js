import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./AuthPage";
import { ProtectedRoute } from "../utils/routeUtils";
import { useSelector } from "react-redux";
import ActiveWorkout from "./ActiveWorkout";
import WorkoutHistoryPage from './WorkoutHistoryPage';

//create protected routes!!
export default function Pages() {
  const needLogin = useSelector((state) => !state.auth.id);
	// const needLogin = true;

  return (
    <>
      {/* hacky way to only show navbar if logged in */}

      <Switch>
        <Route path={["/login", "/signup"]} component={AuthPage} />
        <ProtectedRoute
          path="/"
          exact={true}
          needLogin={needLogin}
          component={WorkoutHistoryPage}
        />
				<ProtectedRoute
          path="/workout"
          exact={true}
          needLogin={needLogin}
          component={ActiveWorkout}
        />
      </Switch>
    </>
  );
}
