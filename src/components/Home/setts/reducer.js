const initial = {
  page: 1,
  results: [],
  search: "",
  request: "",
};

export default function (state = initial, { type, movies, searchValue }) {
  switch (type) {
    case "CLEAR":
      return {
        page: 1,
        results: [],
        search: "",
        request: "",
      };

    case "GET_MOVIES_BY_POPULARITY":
      return {
        ...state,
        results: [...state.results, ...movies],
        page: ++state.page,
        request: "popularity",
      };

    case "GET_MOVIES_BY_SEARCH":
      if (state.request === "" || state.request === "popularity") {
        return {
          ...state,
          results: [...movies],
          page: ++state.page,
          search: searchValue,
          request: "search",
        };
      } else {
        return {
          ...state,
          results: [...state.results, ...movies],
          page: ++state.page,
        };
      }

    case "GET_MOVIES_BY_RATING":
      return {
        ...state,
        results: [...state.results, ...movies],
        page: ++state.page,
        request: "rating",
      };

    default:
      return state;
  }
}
