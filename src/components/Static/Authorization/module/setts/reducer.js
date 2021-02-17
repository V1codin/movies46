const checker = localStorage.getItem("isLogged") === "true" ? true : false;

const init = {
  isLogged: checker,
  user: {},
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
    };
  }

  return state;
}
