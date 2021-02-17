const {
  REACT_APP_API__KEY_MOVIESEARCHER,
  REACT_APP_API__KEY_MOVIESEARCHER_REQUEST_TOKEN,
} = process.env;

const setts = {
  API_KEY: REACT_APP_API__KEY_MOVIESEARCHER,
  URL: "https://api.themoviedb.org/3/",
  CONFIG_URL: "https://api.themoviedb.org/3/configuration",
  SEARCH_URL: "https://api.themoviedb.org/3/search/movie?&api_key=",
  REQUEST_TOKEN: REACT_APP_API__KEY_MOVIESEARCHER_REQUEST_TOKEN,
};

export default setts;
