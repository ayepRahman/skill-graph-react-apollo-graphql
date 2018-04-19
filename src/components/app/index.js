import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "components/pages/home";
// import ListPage from 'components/ListPage';
import CreatePage from "components/CreatePage";
import DetailPage from "components/DetailPage";

export class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={CreatePage} />
          <Route path="/post/:id" component={DetailPage} />
        </div>
      </Router>
    );
  }
}

export default App;
