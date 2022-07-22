import { Map } from "@mui/icons-material";
import { LoadScript } from "@react-google-maps/api";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import LandingPage from "./components/LandingPage.jsx";
import MapDirections from "./components/MapDirections.jsx";
import Profile from "./components/Profile.jsx";
import "./styles.scss";

const App = (props) => {
  return (
    <div className="router">
      <main>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <LoadScript googleMapsApiKey="AIzaSyADsm4pETi_2Ja_1LHGQae6MGBY2SU1UOk">
              <Route exact path="/directions" component={MapDirections} />
            </LoadScript>
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </Router>
      </main>
    </div>
  );
};

export default App;
