import React from "react";
import style from "./styles.module.css";

function MenuButton(props) {
  const { menuClass, checkerFn } = props;

  const containerClass = `${style.container} ${menuClass}`;

  const click = (e) => {
    e.currentTarget.classList.toggle(style.clicked);
    checkerFn((item) => {
      if (item === null) {
        return true;
      } else if (item === true) {
        return false;
      } else if (item === false) {
        return true;
      }
    });
  };

  return (
    <div className={containerClass} onClick={click}>
      <div className={style.top + " " + style.btn}></div>
      <div className={style.mid + " " + style.btn}></div>
      <div className={style.bottom + " " + style.btn}></div>
    </div>
  );
}

export default MenuButton;
