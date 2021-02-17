const initial = {
  page: 1,
  results: [],
  search: "",
  request: "",
};

export default function (state = initial, action) {
  if (action.type === "CLEAR") {
    return {
      page: 1,
      results: [],
      search: "",
      request: "",
    };
  }

  if (action.type === "GET_MOVIES_BY_POPULARITY") {
    return {
      ...state,
      results: [...state.results, ...action.movies],
      page: ++state.page,
      request: "popularity",
    };
  }
  if (action.type === "GET_MOVIES_BY_SEARCH") {
    if (state.request === "" || state.request === "popularity") {
      return {
        ...state,
        results: [...action.movies],
        page: ++state.page,
        search: action.searchValue,
        request: "search",
      };
    } else {
      return {
        ...state,
        results: [...state.results, ...action.movies],
        page: ++state.page,
      };
    }
  }
  if (action.type === "GET_MOVIES_BY_RATING") {
    return {
      ...state,
      results: [...state.results, ...action.movies],
      page: ++state.page,
      request: "rating",
    };
  }

  return state;
}
