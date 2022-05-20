import React from 'react';
import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.loader}>
      <div className={style['lds-ripple']}><div></div><div></div></div>
      <h1>Loading...</h1>
    </div>
  )
}

export default Loader