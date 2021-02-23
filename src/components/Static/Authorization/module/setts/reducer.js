const checker = localStorage.getItem("isLogged") === "true" ? true : false;

const init = {
  isLogged: checker,
  user: {},
  userMovies: {},
};

export default function (state = init, { type, userData }) {
  if (type === "UPDATE") {
    return {
      ...state,
      user: {
        ...state.user,
        ...userData,
      },
    };
  }

  if (type === "LOGIN") {
    return {
      ...state,
      isLogged: true,
      user: {
        ...userData,
      },
    };
  }

  if (type === "LOGOUT") {
    return {
      ...state,
      isLogged: false,
      user: {},
      userMovies: {},
    };
  }

  if (type === "GET_USER_MOVIES") {
    return {
      ...state,
      userMovies: userData,
    };
  }

  if (type === "UPDATE_LIKED") {
    return {
      ...state,
      userMovies: {
        ...state.userMovies,
        liked: [...state.userMovies.liked, userData],
      },
    };
  }

  if (type === "DELETE_LIKED_MOVIE") {
    return {
      ...state,
      userMovies: {
        ...state.userMovies,
        liked: [
          ...state.userMovies.liked.filter((item) => item.id !== userData),
        ],
      },
    };
  }

  if (type === "DELETE_FAVORITES_MOVIE") {
    return {
      ...state,
      userMovies: {
        ...state.userMovies,
        favorites: [
          ...state.userMovies.favorites.filter((item) => item.id !== userData),
        ],
      },
    };
  }

  if (type === "UPDATE_FAVORITES") {
    return {
      ...state,
      userMovies: {
        ...state.userMovies,
        favorites: [...state.userMovies.favorites, userData],
      },
    };
  }
  return state;
}
