import React from "react";
// import {Button} from '@material-ui/core';
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as AuthActions from "../../store/auth";

export default function LogoutButton() {
  // const needLogin = useSelector((state) => !state.auth.id); //should I change auth state to include token?
  const history = useHistory();
  //IMPORTANT
  //there is a bug - if you log in , click through nav (e.g. click demo) and then hit logout, the url stays as /demo but it renders the Rando nav bar, with no auth page. Can't figure out why. May need to do something with history?
  // useEffect(() => {
  //   if (needLogin) {
  //     console.log(needLogin);
  //     history.push("/login");
  //   }
  // }, [needLogin]);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(AuthActions.logout());
    history.push("/login");
  };

  // if (needLogin) {
  //   console.log(needLogin);
  //   history.push("/login");
  // }

  return (
    <NavLink
      className="nav"
      activeClassName="navActive"
      to="/login"
      onClick={handleClick}
    >
      Logout
    </NavLink>
  );
}
