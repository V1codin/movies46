export const mStP = (state) => {
  return {
    reduxState: state.auth.user,
  };
};

export const mDtP = (dispatch) => {
  return {
    updateUser: (newUserData) => {
      return dispatch({
        type: 'UPDATE',
        userData: newUserData,
      });
    },
  };
};
