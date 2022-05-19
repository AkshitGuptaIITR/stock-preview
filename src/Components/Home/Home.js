import { Select } from "antd";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import "antd/dist/antd.css";
const { Option } = Select;

const Home = () => {
  const [record, setRecord] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          "https://api.jsonbin.io/v3/b/6280966238be296761059394"
        );
        setRecord(get(data, "data.record"));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className={style.home}>
      <div className={style.rowSpace}>
        <h2> {get(record[id], "symbol")}</h2>
        <Select value={id} className={style.select}>
          {record.map((recordData, idx) => {
            return (
              <Option key={idx} value={idx}>
                {get(recordData, "symbol")}
              </Option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

export default Home;
