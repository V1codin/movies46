import React from "react";
import style from "./styles.module.css";
import CardButtons from "../userBtns";

function Card(props) {
  const { item, poster, rating } = props;

  return (
    <>
      <div className={style.movieCard}>
        <div className={style.movieCard__content}>
          <img src={poster} alt={item.title}></img>
          <div className={style.content__title}>
            <p>{item.title}</p>
          </div>
          <div className={style.movieCard__rate}>
            <p>{item.vote_average}</p>
            <div style={rating[0]} className={style.rate__block}></div>
            <div style={rating[1]} className={style.rate__block}></div>
            <div style={rating[2]} className={style.rate__block}></div>
            <div style={rating[3]} className={style.rate__block}></div>
            <div style={rating[4]} className={style.rate__block}></div>
            <div style={rating[5]} className={style.rate__block}></div>
            <div style={rating[6]} className={style.rate__block}></div>
            <div style={rating[7]} className={style.rate__block}></div>
            <div style={rating[8]} className={style.rate__block}></div>
            <div style={rating[9]} className={style.rate__block}></div>
          </div>
        </div>
        <div className={style.movieCard__info}>
          <p>{item.release_date}</p>
          <CardButtons id={item.id} />
          <section>{item.overview || "Описание отсутствует"}</section>
        </div>
      </div>
    </>
  );
}

export default Card;
