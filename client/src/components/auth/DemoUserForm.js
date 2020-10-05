import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthThunks } from "../../store/auth";
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
  const history = useHistory();
  const [username, setUsername] = useState("demo@user.com");
  const [password, setPassword] = useState("password");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();

  const handleDemoSubmit = async () => {
    const res = await dispatch(AuthThunks.login(username, password));
    if (res.data.message) {
      setErrors([res.data.message]);
      setPassword("");
    }
    history.push("/history");
  };

  useEffect(() => {
    handleDemoSubmit();
  }, []);

  if (!imageLoaded) {
    return null;
  }

  return (
    <>
      <h1>Log in to Stronklifts</h1>
      {errors ? <Errors errors={errors} /> : null}
      <form onSubmit={handleDemoSubmit} autoComplete="off">
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
