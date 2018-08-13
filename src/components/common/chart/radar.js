import React, { Component } from "react";
import { Radar } from "react-chartjs-2";
import PropType from "prop-types";

export class RadarChart extends Component {
  static propTypes = {};

  static defaultProps = {
    skillName: [],
    skillLevel: []
  };

  render() {
    const { skillName, skillLevel } = this.props;

    const settings = {
      labels: skillName,
      datasets: [
        {
          label: "User Skills", //name of the user /skill maybe,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: skillLevel // array of skill level
        }
      ]
    };

    return <Radar data={settings} />;
  }
}

export default RadarChart;
