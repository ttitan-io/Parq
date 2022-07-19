import { Map } from "@mui/icons-material";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import LandingPage from "./components/LandingPage.jsx";
import MapContainer from "./components/MapDirections.jsx";
import "./styles.scss";

const App = (props) => {
  return (
    <div className="router">
      <main>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/directions" component={MapContainer} />
          </Switch>
        </Router>
      </main>
    </div>
  );
};

export default App;
