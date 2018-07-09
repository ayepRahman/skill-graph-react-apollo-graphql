import React, { Component } from "react";
import decode from "jwt-decode";

export class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const userToken = decode(token) || decode(refreshToken);
      console.log("userToken details", userToken);

      if (userToken) {
        this.setState({
          user: userToken
        });
      }

      debugger;
    } catch (error) {
      this.setState({
        token: null
      });
    }
  };

  render() {
    return <div />;
  }
}

export default UserDetails;
