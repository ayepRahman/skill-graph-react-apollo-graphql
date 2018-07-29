import React from "../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react";
import { Radar } from "react-chartjs-2";

const RadarChart = ({ ...props }) => {
  const data = {
    labels: [], // passing array of strings,
    datasets: [
      {
        label: "", //name of the user /skill maybe,
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(179,181,198,1)",
        data: [] // array of skill level
      }
    ]
  };

  return <Radar data={data} />;
};

export default RadarChart;
