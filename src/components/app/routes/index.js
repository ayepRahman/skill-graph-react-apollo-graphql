import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignUpPage from "components/pages/signup";
import LoginPage from "components/pages/login";
import Home from "components/pages/home";
import NotFound from "components/pages/not-found";

import AuthenticatedRoute from "components/app/routes/auth/AuthenticatedRoute";

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <AuthenticatedRoute path="/home" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
