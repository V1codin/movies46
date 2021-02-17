import React from "react";
import style from "./styles.module.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { mStP } from "./setts/connectFns";

const useStyles = makeStyles({
  root: {
    color: "#2634ff",
  },
});

const useSylesForFav = makeStyles((theme) => ({
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
  const classes = useSylesForFav();
  return (
    <Tooltip arrow classes={classes} {...props} TransitionComponent={Zoom} />
  );
};

function CardBtns(props) {
  const { isLogged, id } = props;

  const classes = useStyles();

  const loginClick = () => {
    localStorage.setItem("filmId", id);
  };

  switch (isLogged) {
    case true:
      return (
        <div className={style.container + " " + style.logged__container}>
          <FavoritToolTip title="Add to Liked">
            <button
              className={style.container__button}
              onClick={() => console.log(id)}
            >
              <FavoriteIcon className={classes.root} fontSize="small" />
            </button>
          </FavoritToolTip>
          <FavoritToolTip title="Add to Favorites">
            <button className={style.container__button}>
              <PlaylistAddCheckIcon className={classes.root} fontSize="small" />
            </button>
          </FavoritToolTip>
        </div>
      );
    case false:
      return (
        <div className={style.container + " " + style.unLogged__container}>
          <FavoritToolTip title="Log In">
            <NavLink to="/auth/logIn" onClick={loginClick}>
              <button className={style.container__button}>
                <MoreHorizIcon />
              </button>
            </NavLink>
          </FavoritToolTip>
        </div>
      );
    default:
      return null;
  }
}

export default connect(mStP, null)(CardBtns);
