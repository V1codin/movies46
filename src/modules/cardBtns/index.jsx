import React from "react";
import style from "./styles.module.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import TocIcon from "@material-ui/icons/Toc";

import FavoriteIcon from "@material-ui/icons/Favorite";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import {
  addToLikedList,
  addToFavoritesList,
} from "../../system/Setts/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { mStP, mDtP } from "./setts/connectFns";
import { useRef } from "react";

const useStyles = makeStyles({
  root: {
    color: "#2634ff",
  },
});

const useSylesForToolTip = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: "#2634ff",
    maxWidth: "120px",
    fontSize: "0.9em",
    textAlign: "center",
  },
}));

const FavoritToolTip = (props) => {
  const classes = useSylesForToolTip();
  return (
    <Tooltip arrow classes={classes} {...props} TransitionComponent={Zoom} />
  );
};

function CardBtns(props) {
  const {
    isLogged,
    currentMovie,
    isSingleMovie,
    updateLiked,
    updateFav,
  } = props;

  const classes = useStyles();

  const singleMovieRef = useRef(null);
  const logInRef = useRef(null);

  const movieCardHandler = () => {
    singleMovieRef.current.click();
  };

  const addLiked = () => {
    addToLikedList(currentMovie, updateLiked, "liked");
  };

  const addFav = () => {
    addToFavoritesList(currentMovie, updateFav, "favorites");
  };

  const unloggedClick = () => {
    localStorage.setItem("filmId", currentMovie.id);
    logInRef.current.click();
  };

  switch (isLogged) {
    case true:
      return (
        <div className={style.container + " " + style.logged__container}>
          <FavoritToolTip title="Add to Liked">
            <button className={style.container__button} onClick={addLiked}>
              <FavoriteIcon className={classes.root} fontSize="small" />
            </button>
          </FavoritToolTip>
          <FavoritToolTip title="Add to Favorites">
            <button className={style.container__button} onClick={addFav}>
              <PlaylistAddCheckIcon className={classes.root} fontSize="small" />
            </button>
          </FavoritToolTip>
          {isSingleMovie !== true ? (
            <FavoritToolTip title="Movie Card">
              <button
                className={style.container__button}
                onClick={movieCardHandler}
              >
                <NavLink
                  ref={singleMovieRef}
                  to={`/movies/${currentMovie.id}`}
                ></NavLink>
                <TocIcon className={classes.root} fontSize="small" />
              </button>
            </FavoritToolTip>
          ) : null}
        </div>
      );
    case false:
      return (
        <div className={style.container + " " + style.unLogged__container}>
          <FavoritToolTip title="Log In">
            <button className={style.container__button} onClick={unloggedClick}>
              <NavLink to="/auth/logIn" ref={logInRef}></NavLink>
              <MoreHorizIcon className={classes.root} />
            </button>
          </FavoritToolTip>
        </div>
      );
    default:
      return null;
  }
}

export default connect(mStP, mDtP)(CardBtns);
