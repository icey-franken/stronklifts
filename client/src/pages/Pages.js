import React from "react";
import { Route } from "react-router-dom";
import LoginPage from './LoginPage';

export default function Pages() {
  return (
    <>
      <Route path='/login' component={LoginPage} />
    </>
  );
}
