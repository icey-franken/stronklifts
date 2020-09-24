import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useRouteMatch } from "react-router-dom";
import "./AuthPage.css"; //remove this import if I use material UI
import { Container } from "@material-ui/core";
import SLLogo from "../components/auth/SLLogo";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
		alignItems: "center",
		paddingTop: '18px',
  },
});

//remove material ui AS A BONUS - I like it how it is now so if it doesn't mess other things up, LEAVE IT
export default function AuthPage() {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const classes = useStyles();
  const match = useRouteMatch();

  //changed to isLoggedIn for semantic reasons
  if (isLoggedIn) return <Redirect to="/history" />;
  // not sure why we have root in classes - is it because container has a class of root put on it by MUI?
  const signingUp = match.path === "/signup";
  return (
    <Container fixed maxWidth="xs" classes={{ root: classes.container }}>
      <SLLogo />
      {signingUp ? <SignupForm /> : <LoginForm />}
    </Container>
  ); //render loginform or signup form based on path params
}
