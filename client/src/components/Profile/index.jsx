import React from "react";
import UserProfile from "./components/userProfile/";

import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";

const mStP = (state) => {
  return {
    isLogged: state.auth.isLogged,
    user: state.auth.user,
  };
};

const mDtP = (dispatch) => {
  return {
    updateUser: (newUser) => {
      return dispatch({
        type: "UPDATE",
        userData: newUser,
      });
    },
  };
};

function Profile(props) {
  const { isLogged, user, updateUser } = props;

  return (
    <Route
      render={(props) =>
        isLogged ? (
          <UserProfile user={user} updateUser={updateUser} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
            }}
          />
        )
      }
    />
  );
}

export default connect(mStP, mDtP)(Profile);
