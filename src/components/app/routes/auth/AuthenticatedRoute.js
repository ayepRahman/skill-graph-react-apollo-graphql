import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import decode from "jwt-decode";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    decode(token);
    decode(refreshToken);
  } catch (error) {
    return false;
  }

  return true;
};

export class AuthenticatedRoute extends Component {
  render() {
    const { component: WrapComponent, rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? (
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
