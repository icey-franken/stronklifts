import React from "react";
import { Route } from "react-router-dom";
import LoginPage from './LoginPage';

//create protected routes!!
export default function Pages() {
  return (
    <>
			{/* <Route exact path='/' component={HomePage} /> */}
      <Route path='/login' component={LoginPage} />
    </>
  );
}
