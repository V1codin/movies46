export default {
  crew: (requestObject, id) => {
    return requestObject.getCast(id);
  },

  singleMovie: (requestObject, id) => {
    return requestObject.getMovie(id);
  },

  images: (requestObject, id) => {
    return requestObject.getImages(id);
  },

  recommendations: (requestObject, id) => {
    return requestObject.getRecommendations(id);
  },

  rating: (requestObject, props) => {
    const {
      moviesRatingAction,
      movies: { page },
    } = props;
    return requestObject.getListByRating(moviesRatingAction, page);
  },

  search: (requestObject, props) => {
    const {
      searchValue,
      moviesSearchAction,
      movies: { page },
    } = props;
    return requestObject.getListFromSearch(
      searchValue,
      moviesSearchAction,
      page
    );
  },

  popularity: (requestObject, props) => {
    const {
      moviesPopularityAction,
      movies: { page },
    } = props;

    return requestObject.getListByPopularity(moviesPopularityAction, page);
  },

  error: () => console.log(Error("Request isn't set")),
};
