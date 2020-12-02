import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { AuthThunks } from "../../store/auth";
import { TextField } from "@material-ui/core";
import AuthSubmitButton from "./AuthSubmitButton";
import Errors from "./Errors";

export default function LoginForm({ imageLoaded }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  if (!imageLoaded) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(AuthThunks.login(username, password));
    if (res.data.message) {
      setErrors([res.data.message]);
      setPassword("");
    } else {
      return <Redirect to="/graph" />;
    }
  };

  const handleDemoLogin = async () => {
    const res = await dispatch(AuthThunks.login("demo@user.com", "password"));
    if (res.data.message) {
      setErrors([res.data.message]);
      setPassword("");
    } else {
      return <Redirect to="/graph" />;
    }
  };

  return (
    <>
      <div className="auth__head">Log in to Stronklifts</div>
      {errors ? <Errors errors={errors} /> : null}
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          variant="outlined"
          label="Username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: "8px" }}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <AuthSubmitButton type={"submit"}>Get Yoked</AuthSubmitButton>
        <div className="auth__subhead">Don't have an account?</div>

        <AuthSubmitButton type={"button"} onClick={handleDemoLogin}>
          Demo Login
        </AuthSubmitButton>
        <AuthSubmitButton
          type={"button"}
          onClick={() => history.push("/signup")}
        >
          Sign Up
        </AuthSubmitButton>
      </form>
    </>
  );
}
