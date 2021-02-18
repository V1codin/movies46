import React from 'react';
import req from '../../system/Request/request';
import style from './styles.module.css';
import thumbnail from '../../system/img/loading_thumbnail.png';
import scrollCalculate from '../../system/Setts/scrollCalc';
import ratingArray from '../../system/Setts/ratingCalc';
import requestAtions from '../../system/Setts/requestActions/actions';
import Card from '../../modules/movieCard';

import { connect } from 'react-redux';
import { useEffect } from 'react';

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    searchValue: state.movies.search,
    request: state.movies.request,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    moviesRatingAction: (moviesResponse) => {
      return dispatch({
        type: 'GET_MOVIES_BY_RATING',
        movies: moviesResponse,
        request: 'rating',
      });
    },
    moviesSearchAction: (moviesResponse) => {
      return dispatch({
        type: 'GET_MOVIES_BY_SEARCH',
        movies: moviesResponse,
        request: 'search',
      });
    },
    clearAction: () => dispatch({ type: 'CLEAR' }),
  };
};

function Rating(props) {
  const { movies, request, moviesRatingAction, clearAction } = props;

  const onScroll = () => {
    const checker = scrollCalculate();

    if (checker) {
      console.log('FETCH ANOTHER PAGE');

      const list = requestAtions.hasOwnProperty(request)
        ? requestAtions[request](req, props)
        : requestAtions.error;

      list();
      window.onscroll = null;
    }
  };

  useEffect(() => {
    window.onscroll = onScroll;
    // eslint-disable-next-line
  }, [movies.results]);

  useEffect(() => {
    clearAction();

    req.getListByRating(moviesRatingAction, 1)();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={style.app}>
      {movies.results.map((item) => {
        const rating = item.vote_average;

        const circles = ratingArray(rating);

        const moviePoster =
          req.image_url && item.poster_path
            ? `${req.image_url}${item.poster_path}`
            : thumbnail;

        return (
          <Card
            item={item}
            poster={moviePoster}
            rating={circles}
            key={item.id * Math.random() + 1}
            isSingle={false}
          />
        );
      })}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
