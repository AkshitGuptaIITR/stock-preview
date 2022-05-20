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
import style from "./Chart.module.css";
import {Radio} from "antd";

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

const Chart = (props) => {
  const { data, type } = props;
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  useEffect(() => {
    let valuesOI = [],
      valuesChange = [];
    let labels = [];
    labels = Object.keys(get(data, "data"));

    for (const j in get(data, "data")) {
      valuesOI.push(get(data, "data")[j].OI);
      valuesChange.push(get(data, "data")[j].OIChange);
    }

    setChartData({
      labels,
      datasets: [
        {
          label: "OI",
          data: valuesOI.map((data) => data),
          stack: "Stack 0",
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgb(75, 192, 192)",
        },
        {
          label: "OIChange",
          data: valuesChange.map((data) => data),
          stack: "Stack 1",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
        },
      ],
    });
  }, [data]);

  return (
    <>
      {type === "lineChart" ? (
        <Line options={options} data={chartData} />
      ) : (
        <Bar options={options} data={chartData} />
      )}
      <div className={style.radioBtn}>
        <Radio.Group>
        </Radio.Group>
      </div>
    </>
  );
};

export default Chart;
