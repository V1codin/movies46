import React from "react";
import CardButtons from "../../../cardBtns";

import style from "./styles.module.css";

import thumbnail from "../../../../components/Static/Img/card_thumbnail.png";

function SingleCard(props) {
  const {
    item: {
      singleMovie,
      cast: { cast },
    },
    rating,
  } = props;

  if (!singleMovie) return null;

  const releaseStyle =
    Date.now() - Date.parse(singleMovie?.release_date) > 0
      ? style.text_green
      : style.text_red;

  return (
    <div className={style.container}>
      {singleMovie?.backdrop_path && (
        <img
          src={singleMovie?.backdrop_path}
          alt={singleMovie?.title ?? ""}
          className={style.moviePoster}
        ></img>
      )}
      <div className={style.movieCard}>
        <h2>{singleMovie?.title ?? ""}</h2>
        <p className={releaseStyle}>{singleMovie?.release_date ?? ""}</p>
        {singleMovie?.tagline && (
          <p>
            Film Tagline: <i>{singleMovie?.tagline}</i>
          </p>
        )}
        <div className={style.rate}>
          <p>{singleMovie?.vote_average}</p>
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
        <div className={style.info}>
          <CardButtons currentMovie={singleMovie} isSingleMovie={true} />
          <section className={style.section}>
            <p>
              {singleMovie?.overview
                ? singleMovie.overview
                : "There is no overview"}
            </p>
          </section>
          <h2 className={style.article}>Cast:</h2>
          <section className={style.section}>
            {cast
              ? cast
                  .filter((_, ind) => ind < 5)
                  .map((item, ind) => {
                    return (
                      <div key={ind * Math.random() + 1} className={style.card}>
                        <p className={style.text_green}>{item.name}</p>
                        <p>as</p>
                        <p>
                          <i>{item.character || "unknown"}</i>
                        </p>
                        <img
                          src={item.profile_path || thumbnail}
                          alt={item.original_name}
                        />
                      </div>
                    );
                  })
              : null}
          </section>
        </div>
      </div>
    </div>
  );
}

export default SingleCard;
