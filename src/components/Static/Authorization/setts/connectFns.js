export const mStP = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

export const mDtP = (dispatch) => {
  return {
    dispatchWrapper: dispatch,
    logoutAction: () => {
      return dispatch({
        type: "LOGOUT",
      });
    },
  };
};
