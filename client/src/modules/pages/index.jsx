import React from "react";
import Card from "../movieCard";
import Spinner from "../spinner/";

import thumbnail from "../../components/Static/Img/card_thumbnail.png";
import style from "./styles.module.css";

import scroll from "../../system/helpers/scrollCalc";
import ratingCalc from "../../system/helpers/ratingCalc";
import setOptions from "../../system/helpers/setDefaultRequestOptions";

import { useRequest } from "../../system/hooks/request.hook.js";
import { useAlert } from "../../system/hooks/alert.hook";

import { useEffect, useState } from "react";

function Page(props) {
  const { requestUrl, searchValue } = props;

  const [movies, setMovies] = useState({
    page: 1,
    results: [],
    _style: style.app,
    loading: true,
  });

  const { error, req, clearError } = useRequest();
  const _alert = useAlert();

  const init = (body = null, cb = null) => {
    req(setOptions(requestUrl, body, cb));
  };

  const onScroll = () => {
    const checker = scroll();

    if (checker) {
      console.log("fetch");

      setMovies({
        ...movies,
        loading: true,
      });

      const body =
        searchValue !== undefined
          ? {
              page: movies.page,
              searchValue,
            }
          : { page: movies.page };

      init(body, (data) => {
        setMovies({
          ...movies,
          page: ++movies.page,
          results: [...movies.results, ...data.results],
          _style: `${style.app} ${style.opacity}`,
          loading: false,
        });
      });

      window.removeEventListener("scroll", onScroll);
    }
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    let mounted = true;

    const body =
      searchValue !== undefined
        ? {
            page: 1,
            searchValue,
          }
        : null;

    init(body, (data) => {
      if (mounted) {
        setMovies({
          ...movies,
          page: ++movies.page,
          results: [...data.results],
          _style: `${style.app} ${style.opacity}`,
          loading: false,
        });
      }
    });

    return () => (mounted = false);

    // eslint-disable-next-line
  }, [searchValue]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line
  }, [movies.results]);

  useEffect(() => {
    _alert(error);
    clearError();
    // eslint-disable-next-line
  }, [error]);

  return (
    <>
      <Spinner isShown={movies.loading} />
      <div className={movies._style}>
        {movies.results.map((item, ind) => {
          const rating = item.vote_average;

          const circles = ratingCalc(rating);

          const moviePoster = item.poster_path ?? thumbnail;

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
    </>
  );
}

export default Page;
