export const mStP = (state) => {
  return {
    movies: state.movies,
    searchValue: state.movies.search,
    request: state.movies.request,
    isLogged: state.auth.isLogged,
  };
};

export const mDtP = (dispatch) => {
  return {
    updateLiked: (newMovie) => {
      return dispatch({
        type: "UPDATE_LIKED",
        userData: newMovie,
      });
    },
    updateFav: (newMovie) => {
      return dispatch({
        type: "UPDATE_FAVORITES",
        userData: newMovie,
      });
    },
  };
};
