import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignUpPage from "components/pages/signup";
import LoginPage from "components/pages/login";
// import Home from "components/pages/home";

import CreatePage from "components/CreatePage";
import DetailPage from "components/DetailPage";

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/create" component={CreatePage} />
          <Route path="/post/:id" component={DetailPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
