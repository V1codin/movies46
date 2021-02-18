import React from "react";
import style from "./styles.module.css";
import User from "../user/";
import PersonIcon from "@material-ui/icons/Person";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

const setLoginButtonClasses = makeStyles((theme) => ({
  login: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function LoginBlock(props) {
  const { isLogged } = props;

  if (isLogged === true) {
    return <User />;
  }
  const loginClass = setLoginButtonClasses();

  return (
    <>
      <div className={style.auth}>
        <NavLink
          to="/auth/logIn"
          className={style.auth__control}
          activeStyle={{
            color: "#00b566",
          }}
        >
          <PersonIcon className={loginClass.login} />
        </NavLink>
      </div>
    </>
  );
}

export default connect(mapStateToProps, null)(LoginBlock);
