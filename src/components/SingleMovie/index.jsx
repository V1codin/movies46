import React from "react";
import style from "./styles.module.css";
import ErrorLoginPage from "../../modules/loginErrorPage/";
import Card from "../../modules/movieCard/";
import req from "../../system//Request/request";
import ratingArray from "../../system/Setts/ratingCalc";

import { connect } from "react-redux";
import { useState, useEffect } from "react";

const mapStateToProps = (state) => {
  return {
    movies: state.movies.results,
  };
};

function SingleMovie(props) {
  const {
    history,
    match: {
      params: { type },
    },
    movies,
  } = props;

  const isLogged = localStorage.getItem("isLogged");
  const [movie, setMovie] = useState({
    rating: -1,
    poster_path: "",
  });

  useEffect(() => {
    const raw = movies.find((i) => i.id === parseInt(type));
    setMovie(raw);
  }, [movies, type]);

  if (isLogged === "false") {
    return <ErrorLoginPage history={history} />;
  }

  const moviePoster =
    req.image_url && movie.poster_path
      ? `${req.image_url}${movie.poster_path}`
      : "";
  const circles = ratingArray(movie.rating);

  if (movie.rating === -1) return null;
  return (
    <div className={style.container}>
      <Card item={movie} poster={moviePoster} rating={circles} styles={style} />
    </div>
  );
}

export default connect(mapStateToProps, null)(SingleMovie);
