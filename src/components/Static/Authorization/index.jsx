import React from "react";
import FormModule from "./module";

import { useState } from "react";
import {
  signInHandler,
  createUser,
  loginRequest,
} from "./setts/registrationAction";
import { getFormData, clearData, errorHandler } from "./setts/dataHelper";
import { mStP, mDtP } from "./setts/connectFns";

import { connect } from "react-redux";

function Auth(props) {
  const {
    dispatchWrapper,
    logoutAction,
    isLogged,
    history,
    match: {
      params: { type },
    },
  } = props;

  const [labelState, setLabelState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    error: false,
    errorText: "",
  });

  const [error, setError] = useState({ isError: false, errorText: "" });

  if (isLogged === true) return null;

  const submit = (e) => {
    e.preventDefault();

    const data = getFormData(e.target);
    if (type === "signIn") {
      signInHandler({
        setLabelState,
        createUser,

        history,

        data,
        setError,
        errorHandler,
      });
      return;
    } else if (type === "logIn") {
      loginRequest(
        data.email,
        data.password,
        dispatchWrapper,
        history,
        errorHandler,
        setError,
        logoutAction
      );
    }

    clearData(e.target);
    return;
  };

  return (
    <>
      <FormModule
        error={error}
        type={type}
        submitFn={submit}
        labelsChecker={labelState}
      />
    </>
  );
}

export default connect(mStP, mDtP)(Auth);
