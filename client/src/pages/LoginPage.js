import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";
import { Redirect } from "react-router-dom";
import "./LoginPage.css"; //remove this import if I use material UI
import { Container, TextField } from "@material-ui/core";
import AuthSubmitButton from "../components/auth/AuthSubmitButton";
import SLLogo from "../components/auth/SLLogo";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  //changed to isLoggedIn for semantic reasons
  if (isLoggedIn) return <Redirect to="/" />;
  // not sure why we have root in classes - is it because container has a class of root put on it by MUI?
  return (
		<Container
			fixed
			maxWidth="xs"
			classes={{ root: classes.container }}
		>
      <SLLogo />
      <h1>Log in to Stronklifts</h1>
        <form onSubmit={handleSubmit}>
            <TextField
              variant="filled"
              label="Username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              variant="filled"
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <AuthSubmitButton>Get Yoked</AuthSubmitButton>
        </form>
    </Container>
  );
}
