/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { get } from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props) => {
  const { data, type } = props;
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let values = [];
    let chartValues = [];
    for (const i in data) {
      chartValues[i] = get(data[i], "strike");
      values[i] = get(data[i], "symbol");
    }
    setChartData({
      datasets: [
        {
          label: "Strike",
          data: chartValues.map((data) => data),
          borderColor: ["rgba(0, 0, 0, 0.5)"],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
        },
      ],
      labels: values,
    });
    setLoading(false);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        display: false,
      },
    },
    font: {
      size: "20px",
    },
  };

  // const lineOptions = {
  //   responsive: true,
  // plugins: {
  //   legend: {
  //     position: 'top',
  //   },
  //   title: {
  //     display: true,
  //     text: 'Chart.js Line Chart',
  //   },
  // },
  // }

  return loading ? (
    <></>
  ) : type === "lineChart" ? (
    <Line options={options} data={chartData} />
  ) : (
    <Bar style={{ fontSize: "28px" }} options={options} data={chartData} />
  );
};

export default BarChart;
