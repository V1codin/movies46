localStorage.setItem("liked", -1);
localStorage.setItem("favorites", -1);

const initial = {
  page: 1,
  search: "",
};

export default function movies(state = initial, { type, movies, searchValue }) {
  switch (type) {
    case "SET_SEARCH_VALUE":
      return {
        ...state,
        search: searchValue,
      };

    /*
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
      */

    default:
      return state;
  }
}
