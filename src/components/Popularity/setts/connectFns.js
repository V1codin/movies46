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
    moviesPopularityAction: (moviesResponse) => {
      return dispatch({
        type: "GET_MOVIES_BY_POPULARITY",
        movies: moviesResponse,
        request: "popularity",
      });
    },
    moviesSearchAction: (moviesResponse) => {
      return dispatch({
        type: "GET_MOVIES_BY_SEARCH",
        movies: moviesResponse,
        request: "search",
      });
    },
    clearAction: () => dispatch({ type: "CLEAR" }),
  };
};
