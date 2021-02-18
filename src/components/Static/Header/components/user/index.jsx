import React from "react";
import style from "./styles.module.css";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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

const setUserMenuClasses = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "#008000",
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const customClasses = setUserMenuClasses();

  return (
    <div>
      <nav className={style.container}>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          classes={{ paper: style.menu, list: style.menu__list }}
        >
          <NavLink
            exact
            className={style.nav__link}
            to="/profile"
            activeClassName={style.nav__link_active}
          >
            <MenuItem
              onClick={handleClose}
              classes={{ root: style.menu__item }}
            >
              Profile
            </MenuItem>
          </NavLink>
          <NavLink
            exact
            className={style.nav__link}
            to="/account"
            activeClassName={style.nav__link_active}
          >
            <MenuItem
              onClick={handleClose}
              classes={{ root: style.menu__item }}
            >
              My account
            </MenuItem>
          </NavLink>
          <MenuItem
            onClick={logoutHandler}
            classes={{ root: style.menu__item }}
          >
            Logout
          </MenuItem>
        </Menu>
        <FavoritToolTip title={user.name}>
          <Avatar
            alt={user.name === "Your Name" ? "A" : user.name}
            src={user.avatarLink}
            className={customClasses.avatar}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          />
        </FavoritToolTip>
      </nav>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
