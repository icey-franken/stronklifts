import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Pages from "./pages/Pages";
import { setUser } from "./store/auth";
import { useDispatch } from "react-redux";
import { AuthNavBar, RandoNavBar } from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";

//pass in an object with overrides - override MuiCssBaseline
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#efefef",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#D22E2E",
    },
  },
});

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const needLogin = useSelector((state) => !state.auth.id);

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
          <div className="pageContainer">
            {needLogin ? <RandoNavBar /> : <AuthNavBar />}
            <div className="content">
              <Pages />
            </div>
            <div className="footer">
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
