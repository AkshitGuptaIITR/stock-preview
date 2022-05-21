/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "antd";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import "antd/dist/antd.css";
import Loader from "../../sharedComponents/Loader/Loader";
import BarChart from "./BarChart/BarChart";
import ChartCom from "./Chart/ChartCom";
const { Option } = Select;

const Home = () => {
  const [record, setRecord] = useState([]);
  const [id, setId] = useState(record.length);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [chartData, setChartData] = useState([
    {
      label: "Bar Chart",
      value: "barChart",
    },
    {
      label: "Line Chart",
      value: "lineChart",
    },
  ]);
  const [currentChart, setCurrentChart] = useState("barChart");

  const handleSelection = (value) => {
    setId(value);
    if (value === record.length) {
      setName("All Strike Prices");
    } else if (value === record.length + 1) {
      setName("Entity Wise Data Distribution");
    }
  };

  const handleCurrentChart = (value) => {
    setCurrentChart(value);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await axios.get(
          "https://api.jsonbin.io/v3/b/6280966238be296761059394"
        );
        setRecord(get(data, "data.record"));
        setId(record.length);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (id === record.length + 1) {
      setChartData([
        {
          label: "Bar & Line Chart",
          value: "barLineChart",
        },
      ]);
      setCurrentChart("barLineChart");
    } else {
      setChartData([
        {
          label: "Bar Chart",
          value: "barChart",
        },
        {
          label: "Line Chart",
          value: "lineChart",
        },
      ]);
      setCurrentChart("barChart");
    }
  }, [id]);

  return loading ? (
    <Loader />
  ) : (
    <div className={style.home}>
      <div className={style.rowSpace}>
        <h2 className={style.mobile}>{get(record[id], "symbol", name)}</h2>
        <Select
          defaultValue={chartData[0].value}
          className={style.select}
          value={currentChart}
          onChange={handleCurrentChart}
        >
          {chartData.map((data, idx) => {
            return (
              <Option key={idx + 80} value={data.value}>
                {data.label}
              </Option>
            );
          })}
        </Select>
        <h2 className={style.desktop}> {get(record[id], "symbol", name)}</h2>
        <Select
          // defaultValue={record.length}
          value={id}
          onChange={handleSelection}
          className={style.select}
        >
          <Option value={record.length}>All Strike Prices</Option>
          {record.map((recordData, idx) => {
            return (
              <Option key={idx} value={idx}>
                {get(recordData, "symbol")}
              </Option>
            );
          })}
          <Option value={record.length + 1}>
            Entity Wise Data Distribution
          </Option>
        </Select>
      </div>
      {id < record.length ? (
        <ChartCom type={currentChart} data={record[id]} />
      ) : null}
      {id === record.length ? (
        <BarChart type={currentChart} data={record} />
      ) : null}
      {id === record.length + 1 ? (
        <ChartCom allData={true} type={currentChart} data={record} />
      ) : null}
    </div>
  );
};

export default Home;
