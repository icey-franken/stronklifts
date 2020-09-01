import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";
import { TextField } from "@material-ui/core";
import AuthSubmitButton from "../components/auth/AuthSubmitButton";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <>
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
    </>
  );
}
