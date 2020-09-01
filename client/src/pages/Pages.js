import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import LoginPage from "./LoginPage";
import { ProtectedRoute } from "../utils/routeUtils";
import { useSelector } from "react-redux";
import Homepage from './Homepage';
import NavBar from '../components/NavBar';

//create protected routes!!
export default function Pages() {
	const needLogin = useSelector((state) => !state.auth.id);
	// const needLogin = true;
  return (
    <>
		{/* hacky way to only show navbar if logged in */}
			{needLogin ? null : <NavBar/>}
      <Switch>
        <Route path="/login" component={LoginPage} />
        <ProtectedRoute
          path="/"
          exact={true}
          needLogin={needLogin}
          component={Homepage}
        />
      </Switch>
    </>
  );
}
