import React from "react";
import Card from "../../modules/movieCard/";
import Spinner from "../../modules/spinner/";

import style from "./styles.module.css";

import ratingCalc from "../../system/helpers/ratingCalc";
import setOptions from "../../system/helpers/setDefaultRequestOptions";

import { useRequest } from "../../system/hooks/request.hook";
import { useState, useEffect, useMemo } from "react";

function SingleMovie(props) {
  const {
    match: {
      params: { type },
    },
  } = props;

  const [state, setState] = useState({
    _style: style.app,
    isSpinner: true,
    movie: {
      cast: {
        cast: [],
        crew: [],
      },
    },
  });

  const { req } = useRequest();

  useEffect(() => {
    const url = `/movies/single/${type}`;

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    let mounted = true;

    req(
      setOptions(url, null, (res) => {
        if (mounted) {
          setState({
            movie: res,
            isSpinner: false,
            _style: `${style.app} ${style.opacity}`,
          });
        }
      })
    );

    return () => (mounted = false);

    // eslint-disable-next-line
  }, [type]);

  const circles = useMemo(
    () => ratingCalc(state.movie.singleMovie?.vote_average),
    [state.movie.singleMovie]
  );

  if (state.movie.rating === -1) return null;

  return (
    <>
      <Spinner isShown={state.isSpinner} />
      <div className={state._style}>
        <Card item={state.movie} rating={circles} isSingle={true} />;
      </div>
    </>
  );
}

export default SingleMovie;
