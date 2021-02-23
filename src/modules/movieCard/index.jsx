import React from "react";
import style from "./styles.module.css";
import CardButtons from "../cardBtns";
import SingleCard from "./components/singleMovieCard";

function Card(props) {
  const { item, poster, rating, isSingle } = props;

  if (isSingle === true) return <SingleCard {...props} />;

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
          {item.release_date !== undefined ? (
            <p>{item.release_date.slice(0, 4)}</p>
          ) : null}
          <CardButtons currentMovie={item} />
          <section>{item.overview || "There is no overview"}</section>
        </div>
      </div>
    </>
  );
}

export default Card;
