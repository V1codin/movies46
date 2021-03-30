const checker = false;

const init = {
  isLogged: checker,
  user: {
    userData: {
      displayName: "",
      email: "",
      photoURL: "",
      phoneNumber: "",
    },
  },
};

export default function auth(state = init, { type, userData }) {
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
        user: {
          userData: {
            displayName: "",
            email: "",
            photoURL: "",
            phoneNumber: "",
          },
        },
      };

    case "GET_USER_MOVIES":
      return {
        ...state,
        user: {
          ...state.user,
          userMovies: userData,
        },
      };

    case "UPDATE_LIKED":
      return {
        ...state,
        user: {
          ...state.user,
          userMovies: {
            ...state.user.userMovies,
            liked: [...state.userMovies.liked, userData],
          },
        },
      };

    case "DELETE_LIKED_MOVIE":
      return {
        ...state,
        user: {
          ...state.user,
          userMovies: {
            ...state.user.userMovies,
            liked: [
              ...state.user.userMovies.liked.filter(
                (item) => item.id !== userData
              ),
            ],
          },
        },
      };

    case "DELETE_FAVORITES_MOVIE":
      return {
        ...state,
        user: {
          ...state.user,
          userMovies: {
            ...state.user.userMovies,
            favorites: [
              ...state.user.userMovies.favorites.filter(
                (item) => item.id !== userData
              ),
            ],
          },
        },
      };

    case "UPDATE_FAVORITES":
      return {
        ...state,
        user: {
          ...state.user,
          userMovies: {
            ...state.user.userMovies,
            favorites: [...state.user.userMovies.favorites, userData],
          },
        },
      };

    default:
      return state;
  }
}
