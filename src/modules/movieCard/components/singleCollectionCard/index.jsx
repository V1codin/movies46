import React from "react";
import style from "./styles.module.css";

import req from "../../../../system/Request/request";
import thumbnail from "../../../../system/img/loading_thumbnail.png";

import Popover from "@material-ui/core/Popover";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import TocIcon from "@material-ui/icons/Toc";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { removeMovieFromList } from "../../../../system/Setts/firebase";

const useStyles = makeStyles(() => ({
  gridCard: {
    margin: "5px 5px 0 0",
    minHeight: "375px !important",
    width: "unset !important",
  },
  gridImg: {
    top: "50% !important",
    left: "0 !important",
    width: "100% !important",
    height: "75% !important",
    position: "relative !important",
    transform: "translateY(-50%) !important",
  },
  gridBar: {
    borderRadius: 14,
  },
  popupList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
  },
  icon: {
    "&:hover": {
      color: "#d2d2d2",
    },
    color: "#ffffff8a",
  },
  red: {
    color: "#ac0d0d",
  },
  yellow: {
    color: "#e3e70f",
  },
  green: {
    color: "#5ee70f",
  },
  paper: {
    height: 75,
    borderRadius: 15,
    backgroundColor: "#00000080",
  },
  button: {
    color: "#2634ff",
  },
}));

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

function CollectionCard(props) {
  const { movie, collectionName, removeMovie } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const singleMovieRef = useRef(null);
  const movieCardHandler = () => {
    singleMovieRef.current.click();
  };

  const removeMovieHandler = async () => {
    // const type = `DELETE_${name}_MOVIE`;
    await removeMovieFromList(movie.id, collectionName, removeMovie);
    // removeMovie(movie.id, type);
    console.log("remove");
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const moviePoster =
    req.image_url && movie.poster_path
      ? `${req.image_url}${movie.poster_path}`
      : thumbnail;

  const ratingClass =
    parseFloat(movie.vote_average) < 4
      ? classes.red
      : parseFloat(movie.vote_average) >= 4 &&
        parseFloat(movie.vote_average) < 6
      ? classes.yellow
      : classes.green;

  const isReleased = Date.now() - Date.parse(movie.release_date) > 0;

  return (
    <GridListTile className={classes.gridCard}>
      <img src={moviePoster} alt={movie.title} className={classes.gridImg} />
      <GridListTileBar
        className={classes.gridBar}
        title={movie.title}
        subtitle={
          <span className={ratingClass}>
            {isReleased
              ? `Average rating ${movie.vote_average}`
              : "Has not released"}
          </span>
        }
        actionIcon={
          <FavoritToolTip title="Movie setts">
            <IconButton
              aria-label={`info about ${movie.title}`}
              className={classes.icon}
              onClick={openMenu}
            >
              <InfoIcon />
            </IconButton>
          </FavoritToolTip>
        }
      />
      <Popover
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeMenu}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        classes={{
          paper: classes.paper,
        }}
      >
        <ul className={classes.popupList}>
          <li>
            <FavoritToolTip title="Remove from the list">
              <button className={style.button} onClick={removeMovieHandler}>
                <HighlightOffIcon className={classes.button} fontSize="small" />
              </button>
            </FavoritToolTip>
          </li>
          <li>
            <FavoritToolTip title="Movie Card">
              <button className={style.button} onClick={movieCardHandler}>
                <NavLink
                  to={`/movies/${movie.id}`}
                  ref={singleMovieRef}
                ></NavLink>
                <TocIcon className={classes.button} fontSize="small" />
              </button>
            </FavoritToolTip>
          </li>
        </ul>
      </Popover>
    </GridListTile>
  );
}

export default CollectionCard;
