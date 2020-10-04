import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";
import { TextField } from "@material-ui/core";
import AuthSubmitButton from "./AuthSubmitButton";
import Errors from "./Errors";

//changing textfield formatting
// import { makeStyles } from "@material-ui/core/styles";
// const useStyles = makeStyles({
//   textfield: {
//     display: "flex",
//     flexDirection: "column",
// 		alignItems: "center",
// 	},
// });

//need to remove autofill formatting from textfield boxes for login and signup
// TextField: {
// 	color: "orange",
// 	"-webkit-autofill": "none",
// 	"-webkit-autofill:hover": "none",
// 	// input:-webkit-autofill:focus,
// 	// input:-webkit-autofill:active

export default function LoginForm({ imageLoaded }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();

  if (!imageLoaded) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(username, password));
    if (res.data.message) {
      setErrors([res.data.message]);
      setPassword("");
    }
  };

  return (
    <>
      <h1>Log in to Stronklifts</h1>
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
