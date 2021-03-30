import React, { useEffect } from "react";
import style from "./styles.module.css";

import { useRef } from "react";
import { useTooltip } from "../../system/hooks/tooltips.hook";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { mStP, mDtP } from "./setts/connectFns";

function CardBtns(props) {
  const { currentMovie, isLogged } = props;

  const history = useHistory();

  const likedToolTip = useRef(null);
  const favoritesToolTip = useRef(null);

  const clickHandler = (e) => {
    const type = e.currentTarget.name;
    if (!isLogged) {
      localStorage.setItem(type, currentMovie.id);
      history.push("/auth/login");
      return;
    }
  };

  const tooltips = useTooltip();

  useEffect(() => {
    tooltips(likedToolTip.current, favoritesToolTip.current);
  }, [tooltips]);

  return (
    <div className={style.container}>
      <button
        className={`waves-effect waves-light ${style.container__button}`}
        onClick={clickHandler}
        ref={likedToolTip}
        data-tooltip="Add to liked"
        name="liked"
      >
        <i className="material-icons">favorite</i>
      </button>
      <button
        className={`waves-effect waves-light ${style.container__button}`}
        onClick={clickHandler}
        ref={favoritesToolTip}
        name="favorites"
        data-tooltip="Add to favorites"
      >
        <i className="material-icons">playlist_add</i>
      </button>
    </div>
  );
}

export default connect(mStP, mDtP)(CardBtns);
