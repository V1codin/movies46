export const mStP = (state) => {
  return {
    movies: state.movies,
    searchValue: state.movies.search,
    request: state.movies.request,
    isLogged: state.auth.isLogged,
  };
};
