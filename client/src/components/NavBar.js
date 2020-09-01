import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import './NavBar.css';

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
      <NavLink
        className="randoNavLink"
        activeClassName="randoAuthNavLink"
        to="/login"
      >
        Log In
      </NavLink>
      <NavLink
        className="randoNavLink"
        activeClassName="randoAuthNavLink"
        to="/signup"
      >
        Sign Up
      </NavLink>
    </nav>
  );
}
