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
import { Bar, Chart, Line } from "react-chartjs-2";
import { get } from "lodash";
import style from "./Chart.module.css";
import {  Select } from "antd";
import { average } from "../../../commonFunctions/average";

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

const Option = Select.Option;

const ChartCom = (props) => {
  const { data, type, allData } = props;
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [date, setDate] = useState(["01-APR-2022"]);
  const [selectedDate, setSelectedDate] = useState("averageData");

  const handleSelection = (value) => {
    setSelectedDate(value);
  };

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
      valuesChange = [],
      chartValues = [],
      values = [];
    let labels = [];
    if (!allData) {
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
    } else {
      labels = Object.keys(get(data[0], "data"));
      setDate(labels);
      for (const i in data) {
        chartValues[i] = get(data[i], "strike");
        values[i] = get(data[i], "symbol");
        if (selectedDate === "averageData") {
          let OI = [],
            OIChange = [];
          for (const j in get(data[i], "data")) {
            OI.push(get(data[i], "data")[j].OI);
            OIChange.push(get(data[i], "data")[j].OIChange);
          }
          valuesOI.push(average(OI));
          valuesChange.push(average(OIChange));
        } else {
          valuesOI.push(get(data[i], "data")[selectedDate].OI);
          valuesChange.push(get(data[i], "data")[selectedDate].OIChange);
        }
      }

      setChartData({
        datasets: [
          {
            label: "Strike",
            type: "line",
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
            borderWidth: 2,
          },
          {
            type: "bar",
            label: "OI",
            backgroundColor: "rgb(75, 192, 192)",
            data: valuesOI.map((data) => data),
          },
          {
            type: "bar",
            label: "OIChange",
            backgroundColor: "rgba(255, 99, 132, 0.8)",
            data: valuesChange.map((data) => data),
          },
        ],
        labels: values,
      });
    }
  }, [data, allData, selectedDate]);

  return (
    <>
      {allData ? (
        <>
          <Chart type="bar" data={chartData} />
          <div className={style.lowerBody}>
            <label htmlFor="">Select Date:</label>
            <Select
              onChange={handleSelection}
              style={{ width: 200 }}
              value={selectedDate}
            >
              <Option value="averageData">Average Data</Option>
              {date.map((dateData, idx) => {
                return (
                  <Option value={dateData} key={idx}>
                    {dateData}
                  </Option>
                );
              })}
            </Select>
          </div>
        </>
      ) : type === "lineChart" ? (
        <Line options={options} data={chartData} />
      ) : (
        <Bar options={options} data={chartData} />
      )}
    </>
  );
};

export default ChartCom;
