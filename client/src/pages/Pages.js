import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./AuthPage";
import { ProtectedRoute } from "../utils/routeUtils";
import { useSelector } from "react-redux";
import Homepage from "./Homepage";

import { AuthNavBar, RandoNavBar } from "../components/NavBar";
//create protected routes!!
export default function Pages() {
  const needLogin = useSelector((state) => !state.auth.id);
	// const needLogin = true;

  return (
    <>
      {/* hacky way to only show navbar if logged in */}
			{needLogin ? <RandoNavBar /> : <AuthNavBar />}
      <Switch>
        <Route path={["/login", "/signup"]} component={AuthPage} />
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
