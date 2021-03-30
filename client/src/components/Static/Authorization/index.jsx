import React from "react";
import FormModule from "./module";

import Spinner from "../../../modules/spinner/";

import { useState } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useRequest } from "../../../system/hooks/request.hook";
import { useAlert } from "../../../system/hooks/alert.hook";
import { signinRequest, loginRequest } from "./setts/auth";
import {
  getFormData,
  debounce,
  clearData,
} from "../../../system/helpers/dataHelper";
import { mStP, mDtP } from "./setts/connectFns";

function Auth(props) {
  const {
    loginAction,
    isLogged,
    history,
    match: {
      params: { type },
    },
  } = props;

  const [labelState, setLabelState] = useState({
    email: null,
    pass: null,
    confirmPass: null,
    isSpinner: false,
  });

  const { req } = useRequest();
  const _alert = useAlert();

  if (isLogged === true)
    return (
      <Route
        render={() => (
          <Redirect
            to={{
              pathname: "/profile",
            }}
          />
        )}
      />
    );

  const sumbitHandler = debounce((target) => {
    setLabelState({
      ...labelState,
      isSpinner: true,
    });
    const data = getFormData(target);
    if (type === "signin") {
      signinRequest({
        req,
        setLabelState,
        history,
        data,
        _alert,
      });
    } else if (type === "login") {
      loginRequest({ data, req, history, _alert, loginAction, setLabelState });
    }

    clearData(target);
    return;
  }, 1000);

  const submit = (e) => {
    e.preventDefault();
    sumbitHandler(e.target);
  };

  return (
    <>
      <Spinner isShown={labelState.isSpinner} />
      <FormModule type={type} submitFn={submit} labelsChecker={labelState} />
    </>
  );
}

export default connect(mStP, mDtP)(Auth);
