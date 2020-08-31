import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";
import { Redirect } from "react-router-dom";
import "./LoginPage.css"; //remove this import if I use material UI

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  //changed to isLoggedIn for semantic reasons
  if (isLoggedIn) return <Redirect to="/" />;

  return (
    <>
      <h1>Stronklifts login page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder='Enter username'
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Enter password'
            />
          </label>
        </div>
        <button type="submit">Get Yoked</button>
      </form>
    </>
  );
}
