import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./NavBar.css";

//nav bar navlink rendering looks like shit if width less than 200 px on rando nav bar because text goes to new line - how to set minimum page width?
// i want to add a calendar and a demos page with info about each lift.

export default function NavBar({ needLogin }) {
  return (
    <nav className="navbar">
      {needLogin ? null : (
        <>
          <NavLink
            className="nav"
            activeClassName="navActive"
            exact
            to="/history"
          >
            History
          </NavLink>
          <NavLink className="nav" activeClassName="navActive" to="/progress">
            Progress
          </NavLink>

          <NavLink
            className="nav"
            activeClassName="navActive"
            to="/workout/new"
          >
            Workout
          </NavLink>
          <LogoutButton />
        </>
      )}
    </nav>
  );
}
