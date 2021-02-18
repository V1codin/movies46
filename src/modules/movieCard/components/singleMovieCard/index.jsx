import React from "react";
import style from "./styles.module.css";
import CardButtons from "../../../cardBtns";

function SingleCard(props) {
  const {
    item: { storage, singleMovie, crew, imgUrl, bigResUrl },
    rating,
  } = props;

  const moviePoster = storage.backdrop_path
    ? `${bigResUrl}${storage.backdrop_path}`
    : `${bigResUrl}${storage.poster_path}`;

  const releaseStyle =
    singleMovie?.status === "Released"
      ? style.article_green
      : style.article_red;

  return (
    <>
      <div className={style.container}>
        <img
          src={moviePoster}
          alt={storage.title}
          className={style.moviePoster}
        ></img>
        <div className={style.movieCard}>
          <h2>{storage.title}</h2>
          <p className={releaseStyle}>{storage.release_date}</p>
          {singleMovie?.tagline && (
            <p>
              Film Tagline: <i>{singleMovie?.tagline}</i>
            </p>
          )}
          <div className={style.movieCard__rate}>
            <p>{storage.vote_average}</p>
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
          <div className={style.movieCard__info}>
            <CardButtons currentMovie={storage} isSingleMovie={true} />
            <section className={style.info__section}>
              <p>{storage.overview || "There is no overview"}</p>
            </section>
            <h2 className={style.info__article}>Cast:</h2>
            <section className={style.info__section}>
              {crew?.cast
                .filter((_, ind) => ind < 5)
                .map((item, ind) => {
                  return (
                    <div
                      key={ind * Math.random() + 1}
                      className={style.section__card}
                    >
                      <p>{item.name}</p>
                      <p>as</p>
                      <p>
                        <i>{item.character}</i>
                      </p>
                      <img
                        src={imgUrl + item.profile_path}
                        alt={item.original_name}
                        className={style.info__img}
                      />
                    </div>
                  );
                })}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleCard;
