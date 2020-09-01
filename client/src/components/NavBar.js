import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import "./NavBar.css";

//nav bar navlink rendering looks like shit if width less than 200 px on rando nav bar because text goes to new line - how to set minimum page width?

export function AuthNavBar() {
  return (
    <nav>
      <NavLink className="nav" activeClassName="navActive" exact to="/">
        Home
      </NavLink>
      <NavLink className="nav" activeClassName="navActive" to="/calendar">
        Calendar
      </NavLink>
      <NavLink className="nav" activeClassName="navActive" to="/workout">
        Workout
      </NavLink>
      <NavLink className="nav" activeClassName="navActive" to="/demos">
        Demos
      </NavLink>
      <LogoutButton />
    </nav>
  ); //proper pathname for navlink to logout?????
}

export function RandoNavBar() {
  return (
    <nav>
      <NavLink className="nav" activeClassName="navActive" to="/signup">
        Sign Up
      </NavLink>
      <NavLink className="nav" activeClassName="navActive" to="/login">
        Log In
      </NavLink>
    </nav>
  );
}
