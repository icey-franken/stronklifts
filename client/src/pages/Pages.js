import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./AuthPage";
import { ProtectedRoute } from "../utils/routeUtils";
import { useSelector } from "react-redux";
import EditWorkoutPage from "./EditWorkoutPageContainer";
import NewWorkoutPage from "./NewWorkoutPageContainer";
import DemosPage from './DemosPage'
import CalendarPage from './CalendarPage'
import NewLifterForm from '../components/NewLifterForm';
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
          path="/calendar"
          exact={true}
          needLogin={needLogin}
          component={CalendarPage}
        />
				<ProtectedRoute
          path="/workout/new"
          exact={true}
          needLogin={needLogin}
          component={NewWorkoutPage}
        />
				<ProtectedRoute
          path="/demos"
          exact={true}
          needLogin={needLogin}
          component={DemosPage}
        />
				<ProtectedRoute
          path="/workout/edit/:workoutId"
          exact={true}
          needLogin={needLogin}
          component={EditWorkoutPage}
        />
				<ProtectedRoute
          path="/newLifterForm"
          exact={true}
          needLogin={needLogin}
          component={NewLifterForm}
        />
      </Switch>
  );
}
