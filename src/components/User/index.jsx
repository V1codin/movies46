import React from "react";
import style from "./styles.module.css";
import Collection from "./components/collection";
import ErrorLoginPage from "../../modules/loginErrorPage/";

import { connect } from "react-redux";

const mStP = (state) => {
  return {
    movies: state.auth.userMovies,
  };
};

const mDtP = (dispatch) => {
  return {
    removeMovieFromList: (id, type) => {
      return dispatch({
        type,
        userData: id,
      });
    },
  };
};

function UserAccount(props) {
  const { history, movies, removeMovieFromList } = props;

  const isLogged = localStorage.getItem("isLogged");

  if (
    isLogged === "false" ||
    isLogged === null ||
    movies === undefined ||
    movies === null
  ) {
    return <ErrorLoginPage history={history} />;
  }

  const collectionName = Object.keys(movies);

  return (
    <div className={style.app}>
      {collectionName.map((item, ind) => {
        return (
          <Collection
            key={ind * Math.random() + 1}
            collectionName={item}
            movies={movies[item]}
            removeMovieFromList={removeMovieFromList}
          />
        );
      })}
    </div>
  );
}

export default connect(mStP, mDtP)(UserAccount);
