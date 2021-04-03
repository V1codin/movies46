import React from "react";

import style from "./styles.module.css";

import { useState, useEffect, useCallback } from "react";

function Home() {
  const [state, setState] = useState({
    sec: "",
    min: "",
    hr: "",
  });

  const day = new Date();
  const delta = 6;

  const handler = useCallback(() => {
    const min = day.getMinutes();
    const sec = day.getSeconds();
    const hour = day.getHours() * 30;

    setState({
      ...state,
      sec: `rotateZ(${sec * delta + 180}deg)`,
      min: `rotateZ(${min * delta + 180}deg)`,
      hr: `rotateZ(${hour + min / 2 + 180}deg)`,
    });

    // eslint-disable-next-line
  }, [day]);

  useEffect(() => {
    const interval = setInterval(() => handler(), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [handler]);

  return (
    <div className={style.app}>
      <h2>It's time to choose a movie to watch</h2>
      <div className={style.container}>
        <div className={style.clock}>
          <div className={style.hour}>
            <div
              className={`${style.hr} ${style.hand}`}
              style={{ transform: state.hr }}
            ></div>
          </div>
          <div className={style.min}>
            <div
              className={`${style.mn} ${style.hand}`}
              style={{ transform: state.min }}
            ></div>
          </div>
          <div className={style.second}>
            <div
              className={`${style.sc} ${style.hand}`}
              style={{ transform: state.sec }}
            ></div>
          </div>
        </div>
        <svg className={style.ring}>
          <circle
            className={style.circle}
            stroke="#fff"
            strokeWidth="4"
            fill="transparent"
            r="173"
            cx="245"
            cy="155"
          />
        </svg>
      </div>
    </div>
  );
}
export default Home;
