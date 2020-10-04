import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthActions } from "../../store/auth";
import { TextField } from "@material-ui/core";
import AuthSubmitButton from "./AuthSubmitButton";
import Errors from "./Errors";

export default function SignupForm({ imageLoaded }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();

  if (!imageLoaded) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      AuthActions.signup(username, email, password, confirmPassword)
    );
    if (res.data.error) {
      setErrors(res.data.error.errors);
      setPassword("");
      setConfirmPassword("");
		}
		history.push('/history');
  };
  //make separate errors component?

  return (
    <>
      <h1>Sign up for Stronklifts</h1>
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
        />
        <TextField
          variant="outlined"
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <AuthSubmitButton>Get Yoked</AuthSubmitButton>
      </form>
    </>
  );
}
