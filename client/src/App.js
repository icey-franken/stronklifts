import ReactGA from "react-ga";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PageRouter from "./pages/PageRouter";
import { AuthActions } from "./store/auth";
import { useDispatch } from "react-redux";
import NavBar from "./components/utils/NavBar";
import Footer from "./components/utils/Footer";
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

(function initializeReactGA() {
  ReactGA.initialize("G-9YL0VHFLCF");
  ReactGA.pageview("/homepage");
})();

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const needLogin = useSelector((state) => !state.auth.id);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // enter your back end route to get the current user
        const res = await fetch("/api/session");
        if (!res.ok) {
          throw res;
        }
        res.data = await res.json(); // current user info
        dispatch(AuthActions.setUser(res.data.user)); //creates set user action so that user info added to redux store upon page load if user already logged in.

        setLoading(false);
      } catch (e) {
        console.error(e);
      }
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
            <NavBar needLogin={needLogin} />
            <div className="content">
              <PageRouter />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
