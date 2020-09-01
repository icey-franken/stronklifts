import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Pages from "./pages/Pages";
import { setUser } from "./store/auth";
import { useDispatch } from "react-redux";

//pass in an object with overrides - override MuiCssBaseline
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "pink",
        },
      },
    },
    // MuiTextField: {
    //   text: {
    //     color: "#000000",
    //   },
    // },
    // palette: {
    //   primary: {
    //     main: "#000000",
    //   },
    // },
  },
});

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      // enter your back end route to get the current user
      const res = await fetch("/api/session");
      if (res.ok) {
        res.data = await res.json(); // current user info
        dispatch(setUser(res.data.user)); //creates set user action so that user info added to redux store upon page load if user already logged in.
      }
      setLoading(false);
    };
    loadUser();
  }, [dispatch]);

  if (loading) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
