import React from "react";
import CardButtons from "../cardBtns/";
import SingleCard from "./components/singleMovieCard";

import style from "./styles.module.css";

import { NavLink } from "react-router-dom";

function Card(props) {
  const { item, poster, rating, isSingle } = props;

  const navlink = `/movies/card/${item.id}`;

  if (isSingle === true) return <SingleCard {...props} />;

  return (
    <>
      <div className={style.movieCard}>
        <div className={style.content}>
          <NavLink exact to={navlink}>
            <img src={poster} alt={item.title}></img>
          </NavLink>
          <div className={style.title}>
            <p>{item.title}</p>
          </div>
          <div className={style.rate}>
            <p>{item.vote_average}</p>
            <div style={rating[0]} className={style.circle}></div>
            <div style={rating[1]} className={style.circle}></div>
            <div style={rating[2]} className={style.circle}></div>
            <div style={rating[3]} className={style.circle}></div>
            <div style={rating[4]} className={style.circle}></div>
            <div style={rating[5]} className={style.circle}></div>
            <div style={rating[6]} className={style.circle}></div>
            <div style={rating[7]} className={style.circle}></div>
            <div style={rating[8]} className={style.circle}></div>
            <div style={rating[9]} className={style.circle}></div>
          </div>
        </div>
        <div className={style.info}>
          {item.release_date !== undefined ? (
            <p>{item.release_date.slice(0, 4)}</p>
          ) : null}
          <CardButtons currentMovie={item} />
          <NavLink exact to={navlink}>
            <section>{item.overview || "There is no overview"}</section>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Card;
