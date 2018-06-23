import React, { Component } from "react";
import Loader from "react-loaders";

export class LoaderSpinner extends Component {
  render() {
    const { type, ...others } = this.props;

    const defaultSettings = {
      type: "ball-scale-multiple"
    };

    const settings = {
      ...defaultSettings,
      ...others
    };

    return <Loader type={type} active {...settings} />;
  }
}

export default LoaderSpinner;
