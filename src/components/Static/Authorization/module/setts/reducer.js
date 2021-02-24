const checker = localStorage.getItem("isLogged") === "true" ? true : false;

const init = {
  isLogged: checker,
  user: {},
  userMovies: {},
};

export default function (state = init, { type, userData }) {
  switch (type) {
    case "UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          ...userData,
        },
      };

    case "LOGIN":
      return {
        ...state,
        isLogged: true,
        user: {
          ...userData,
        },
      };

    case "LOGOUT":
      return {
        ...state,
        isLogged: false,
        user: {},
        userMovies: {},
      };

    case "GET_USER_MOVIES":
      return {
        ...state,
        userMovies: userData,
      };

    case "UPDATE_LIKED":
      return {
        ...state,
        userMovies: {
          ...state.userMovies,
          liked: [...state.userMovies.liked, userData],
        },
      };

    case "DELETE_LIKED_MOVIE":
      return {
        ...state,
        userMovies: {
          ...state.userMovies,
          liked: [
            ...state.userMovies.liked.filter((item) => item.id !== userData),
          ],
        },
      };

    case "DELETE_FAVORITES_MOVIE":
      return {
        ...state,
        userMovies: {
          ...state.userMovies,
          favorites: [
            ...state.userMovies.favorites.filter(
              (item) => item.id !== userData
            ),
          ],
        },
      };

    case "UPDATE_FAVORITES":
      return {
        ...state,
        userMovies: {
          ...state.userMovies,
          favorites: [...state.userMovies.favorites, userData],
        },
      };

    default:
      return state;
  }
}
