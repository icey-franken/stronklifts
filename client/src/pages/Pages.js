import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./AuthPage";
import { ProtectedRoute } from "../utils/routeUtils";
import { useSelector } from "react-redux";
import EditWorkoutPage from "./EditWorkoutPageContainer";
import NewWorkoutPage from "./NewWorkoutPageContainer";
import DemosPage from "./DemosPage";
import CalendarPage from "./CalendarPage";
import NewLifterForm from "../components/NewLifterForm";
import WorkoutHistoryPage from "./WorkoutHistoryPage";
import GraphPage from "./GraphPage";

import { useDispatch } from "react-redux";
import { workoutThunks } from "../store/workouts";
import { useEffect } from "react";

export default function Pages() {
  const userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  console.log(userId);
  useEffect(() => {
    if (userId) {
      dispatch(workoutThunks.getWorkouts(userId));
    }
  }, [dispatch, userId]);

  const { workoutsLoaded } = useSelector((state) => state.workouts);
  if (userId && !workoutsLoaded) {
    return null;
  }

  return (
    <Switch>
      <Route path={["/login", "/signup"]} component={AuthPage} />
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
