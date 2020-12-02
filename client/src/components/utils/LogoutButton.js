import React from "react";
// import {Button} from '@material-ui/core';
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { AuthThunks } from "../../store/auth";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleClick = () => {
		dispatch(AuthThunks.logout())
		// .then(()=>{
			// return <Redirect to="/login" />;
		// });
  };

  return (
    <div
      className="nav"
			style={{'cursor':'pointer'}}
      onClick={handleClick}
    >
      Logout
    </div>
  );
}
