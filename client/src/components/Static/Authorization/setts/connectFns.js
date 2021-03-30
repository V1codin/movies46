export const mStP = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

export const mDtP = (dispatch) => {
  return {
    loginAction: (data) =>
      dispatch({
        type: "LOGIN",
        userData: data,
      }),
    logoutAction: () =>
      dispatch({
        type: "LOGOUT",
      }),
  };
};
