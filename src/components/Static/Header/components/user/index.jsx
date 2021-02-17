import React from "react";
import style from "./styles.module.css";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import { useState, useEffect } from "react";
import { db, logoutWrapper } from "../../../../../system/Setts/firebase";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const mapDispatchToProps = (dispatch) => {
  return {
    logOutAction: () => {
      return dispatch({
        type: "LOGOUT",
      });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    userData: state.auth.user,
  };
};

const setAvatarClasses = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "green",
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
}));

const setToolTipClasses = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: "#2634ff",
    maxWidth: "120px",
    fontSize: "0.9em",
    textAlign: "center",
  },
}));

const FavoritToolTip = (props) => {
  const toolTip = setToolTipClasses();
  return <Tooltip classes={toolTip} {...props} TransitionComponent={Zoom} />;
};

function User(props) {
  const { logOutAction, userData } = props;

  const [user, setUser] = useState({
    avatarLink: "",
    name: "Your Name",
  });

  const logoutHandler = logoutWrapper(logOutAction);

  useEffect(() => {
    const res = db.auth();
    const current = res.currentUser;
    if (current !== null) {
      const avatarLink = userData.photoURL === "" ? "" : userData.photoURL;
      const userName =
        userData.displayName === "" ? "Your Name" : userData.displayName;
      setUser({
        ...user,
        avatarLink: avatarLink,
        name: userName,
      });
    } else {
      logoutHandler();
      setUser({
        ...user,
      });
    }
    // eslint-disable-next-line
  }, [userData]);

  const avatarClasses = setAvatarClasses();

  return (
    <div className={style.container} onClick={logoutHandler}>
      <FavoritToolTip title={user.name}>
        <Avatar
          alt={user.name === "Your Name" ? "A" : user.name}
          src={user.avatarLink}
          className={avatarClasses.avatar}
        />
      </FavoritToolTip>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
