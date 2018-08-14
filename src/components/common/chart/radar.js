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

    console.log(skillName);
    console.log(skillLevel);

    const settings = {
      labels: skillName,
      datasets: [
        {
          label: "User Skill Level", //name of the user /skill maybe,
          backgroundColor: "#DCFFB780",
          borderColor: "#B6FF6A80",
          pointBackgroundColor: "#B0CC92",
          pointBorderColor: "#447F07",
          pointHoverBackgroundColor: "#DCFFB7",
          pointHoverBorderColor: "#B6FF6A",
          data: skillLevel // array of skill level
        }
      ]
    };

    return <Radar data={settings} />;
  }
}

export default RadarChart;
