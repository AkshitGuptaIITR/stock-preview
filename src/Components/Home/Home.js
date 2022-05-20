import { Select } from "antd";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import "antd/dist/antd.css";
import Loader from "../../sharedComponents/Loader/Loader";
import BarChart from "./BarChart/BarChart";
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
  ]);
  const [currentChart, setCurrentChart] = useState("");
  const [chartInfo, setChartInfo] = useState([]);

  const handleSelection = (value) => {
    let values = [];
    setId(value);
    if (value === record.length) {
      // for(const i in record){
      //   values[i]
      // }
      setName("All Strike Prices");
    }
    setChartInfo(values);
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
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className={style.home}>
      <div className={style.rowSpace}>
        <Select
          defaultValue={chartData[0].value}
          className={style.select}
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
        <h2> {get(record[id], "symbol", name)}</h2>
        <Select
          defaultValue={record.length}
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
          <Option value={record.length + 1}>All Strike Prices</Option>
        </Select>
      </div>
      {id === record.length ? <BarChart data={record} /> : null}
    </div>
  );
};

export default Home;
