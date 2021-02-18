import React from 'react';
import ErrorLoginPage from '../../modules/loginErrorPage/';
import Card from '../../modules/movieCard/';
import req from '../../system//Request/request';
import requestAtions from '../../system/Setts/requestActions/actions';
import ratingArray from '../../system/Setts/ratingCalc';

import { connect } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';

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

  const isLogged = localStorage.getItem('isLogged');
  const [movie, setMovie] = useState({
    storage: { ...movies.find((i) => i.id === parseInt(type)) },
  });

  useEffect(() => {
    window.onscroll = null;

    (async function () {
      const singleMovie = await requestAtions.singleMovie(
        req,
        parseInt(type)
      )();

      const crew = await requestAtions.crew(req, parseInt(type))();
      const imgUrl = req.image_url;
      const bigResUrl = req.big_res_url;

      setMovie({
        ...movie,
        crew,
        singleMovie,
        imgUrl,
        bigResUrl,
      });
    })();
    // eslint-disable-next-line
  }, [type]);

  const circles = useMemo(() => ratingArray(movie.storage.vote_average), [
    movie.storage.vote_average,
  ]);

  if (isLogged === 'false') {
    return <ErrorLoginPage history={history} />;
  }

  if (movie.rating === -1) return null;

  return (
    <>
      <Card item={movie} rating={circles} isSingle={true} />
    </>
  );
}

export default connect(mapStateToProps, null)(SingleMovie);
