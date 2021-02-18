import React from 'react';
import Card from '../../modules/movieCard';
import req from '../../system/Request/request';
import style from './styles.module.css';
import thumbnail from '../../system/img/loading_thumbnail.png';
import scrollCalculate from '../../system/Setts/scrollCalc';
import ratingArray from '../../system/Setts/ratingCalc';
import requestAtions from '../../system/Setts/requestActions/actions';

import { useEffect } from 'react';
import { connect } from 'react-redux';
import { mStP, mDtP } from './setts/connectFns';

function App(props) {
  const { movies, request, moviesPopularityAction, clearAction } = props;

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

    req.getListByPopularity(moviesPopularityAction, 1)();
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
export default connect(mStP, mDtP)(App);
