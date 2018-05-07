import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export class AuthenticatedRoute extends Component {
  render() {
    const { component: WrapComponent, rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          localStorage.getItem("token") ? (
            <WrapComponent {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

export default AuthenticatedRoute;
