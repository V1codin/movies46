export const mStP = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

export const mDtP = (dispatch) => {
  return {
    loginAction: (userObj) => {
      return dispatch({
        type: "LOGIN",
        userData: userObj,
      });
    },
    logoutAction: () => {
      return dispatch({
        type: "LOGOUT",
      });
    },
  };
};
