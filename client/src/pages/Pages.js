import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./AuthPage";
import { ProtectedRoute, ProtectedRouteNew } from "../utils/routeUtils";
import { useSelector } from "react-redux";
import EditWorkoutPage from "./EditWorkoutPageContainer";
import NewWorkoutPage from "./NewWorkoutPageContainer";
import DemosPage from './DemosPage'
import CalendarPage from './CalendarPage'
import NewLifterForm from '../components/NewLifterForm';
import WorkoutHistoryPage from './WorkoutHistoryPage';
import GraphPage from './GraphPage';

import { useDispatch } from "react-redux";
import { workoutThunks } from "../store/workouts";
import { useEffect } from "react";

export default function Pages() {

	const userId = useSelector((state) => state.auth.id);
	const needLogin = useSelector((state) => !state.auth.id);
	// const needLogin = !userId;
  const workouts = useSelector((state) => state.workouts);
	const hasWorkouts = Object.keys(workouts).length > 0;
	const dispatch = useDispatch();
  useEffect(() => {
		dispatch(workoutThunks.getWorkouts(userId))
	}, [dispatch, userId]);

  return (
      <Switch>
        <Route path={["/login", "/signup"]} component={AuthPage} />
        <ProtectedRoute
          path="/history"
          exact={true}
          needLogin={needLogin}
					component={WorkoutHistoryPage}
					hasWorkouts={hasWorkouts}
        />
				<ProtectedRoute
          path="/calendar"
          exact={true}
          needLogin={needLogin}
					hasWorkouts={hasWorkouts}
					component={CalendarPage}
        />
				<ProtectedRoute
          path="/workout/new"
          exact={true}
          needLogin={needLogin}
					hasWorkouts={hasWorkouts}
          component={NewWorkoutPage}
        />
				<ProtectedRoute
          path="/demos"
          exact={true}
          needLogin={needLogin}
					hasWorkouts={hasWorkouts}
          component={DemosPage}
        />
				<ProtectedRoute
          path="/graph"
          exact={true}
          needLogin={needLogin}
					hasWorkouts={hasWorkouts}
          component={GraphPage}
        />
				<ProtectedRoute
          path="/workout/edit/:workoutId"
          exact={true}
          needLogin={needLogin}
					hasWorkouts={hasWorkouts}
          component={EditWorkoutPage}
        />
				<ProtectedRouteNew
          path="/newLifterForm"
          exact={true}
          needLogin={needLogin}
					hasWorkouts={hasWorkouts}
          component={NewLifterForm}
        />
      </Switch>
  );
}
