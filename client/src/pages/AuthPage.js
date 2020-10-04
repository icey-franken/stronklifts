import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import "./AuthPage.css"; //remove this import if I use material UI
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import logo from "../icons/lg-sl-icon.png";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "18px",
  },
});

//remove material ui AS A BONUS - I like it how it is now so if it doesn't mess other things up, LEAVE IT
export default function AuthPage() {
  const classes = useStyles();
  const match = useRouteMatch();

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoaded = () => {
    if (!imageLoaded) {
      setImageLoaded(true);
    }
  };
  //render loginform or signup form based on path params
  let form =
    match.path === "/signup" ? (
      <SignupForm imageLoaded={imageLoaded} />
    ) : (
      <LoginForm imageLoaded={imageLoaded} />
    );

  return (
    <Container fixed maxWidth="xs" classes={{ root: classes.container }}>
      <img
        className="lg-logo"
        src={logo}
        alt="Stronklifts Logo"
        style={imageLoaded ? { height: "100px" } : null}
        onLoad={handleLoaded}
      />
      {form}
    </Container>
  );
}
