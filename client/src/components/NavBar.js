import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import {Button} from '@material-ui/core';

export function AuthNavBar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/calendar">Calendar</NavLink>
      <NavLink to="/workout">Workout</NavLink>
      <NavLink to="/demos">Demos</NavLink>
      <NavLink to="/login" component={LogoutButton} />
    </nav>
  ); //proper pathname for navlink to logout?????
}

export function RandoNavBar() {
  return (
    <nav>
      <h1>navbar for losers</h1>
			<NavLink to='/login'><Button>Log In</Button></NavLink>
			<NavLink to='/signup'><Button>Sign Up</Button></NavLink>
    </nav>
  );
}
