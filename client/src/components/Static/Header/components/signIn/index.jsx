import React from "react";
import style from "./styles.module.css";

import { NavLink } from "react-router-dom";

function LoginBlock() {
  return (
    <div className={style.app}>
      <NavLink
        to="/auth/login"
        className={style.link}
        activeStyle={{
          color: "#00b566",
        }}
      >
        <i className={`large material-icons ${style.personIcon}`}>person</i>
      </NavLink>
    </div>
  );
}

export default LoginBlock;
