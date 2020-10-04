import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";

import { ProtectedRoute, AuthRoute } from "../utils/routeUtils";
import { workoutThunks } from "../store/workouts";

import AuthPage from "./AuthPage";
import WorkoutHistoryPage from "./WorkoutHistoryPage";
import CalendarPage from "./CalendarPage";
import NewWorkoutPage from "./NewWorkoutPageContainer";
import DemosPage from "./DemosPage";
import GraphPage from "./GraphPage";
import EditWorkoutPage from "./EditWorkoutPageContainer";
import NewLifterForm from "../components/NewLifterForm";

export default function Pages() {
  const userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  const { workoutsLoaded } = useSelector((state) => state.workouts);

  useEffect(() => {
    if (userId) {
      dispatch(workoutThunks.getWorkouts(userId));
    }
  }, [dispatch, userId]);

  return userId && !workoutsLoaded ? null : (
    <Switch>
      <AuthRoute path={["/login", "/signup"]} component={AuthPage} />
      <ProtectedRoute
        path="/history"
        exact={true}
        component={WorkoutHistoryPage}
      />
      <ProtectedRoute path="/calendar" exact={true} component={CalendarPage} />
      <ProtectedRoute
        path="/workout/new"
        exact={true}
        component={NewWorkoutPage}
      />
      <ProtectedRoute path="/demos" exact={true} component={DemosPage} />
      <ProtectedRoute path="/graph" exact={true} component={GraphPage} />
      <ProtectedRoute
        path="/workout/edit/:workoutId"
        exact={true}
        component={EditWorkoutPage}
      />
      <ProtectedRoute
        path="/newLifterForm"
        exact={true}
        component={NewLifterForm}
      />
    </Switch>
  );
}
