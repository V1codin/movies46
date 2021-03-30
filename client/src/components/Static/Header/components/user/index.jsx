import React, { useRef } from "react";
import style from "./styles.module.css";

import thumbnail from "../../../Img/avatar_thumbnail.jpg";

import setOpts from "../../../../../system/helpers/setDefaultRequestOptions";

import { debounce } from "../../../../../system/helpers/dataHelper";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useDropDown } from "../../../../../system/hooks/dropDown.hook";
import { useRequest } from "../../../../../system/hooks/request.hook";
import { useAlert } from "../../../../../system/hooks/alert.hook";

const mDtP = (dispatch) => {
  return {
    logOutAction: () => {
      return dispatch({
        type: "LOGOUT",
      });
    },
  };
};

function User(props) {
  const {
    logOutAction,
    user: {
      userData: { photoURL, photoFile },
    },
  } = props;

  const [avatarLink, setAvatarLink] = useState(thumbnail);
  const avatarRef = useRef(null);

  const dropDown = useDropDown();

  const { req } = useRequest();
  const _alert = useAlert();

  const logout = debounce(() => {
    req(
      setOpts("/auth/logout", null, (res) => {
        _alert(res.message, false);
        logOutAction();
      })
    );
  }, 1000);

  useEffect(() => {
    dropDown(avatarRef.current);
  }, [dropDown]);

  useEffect(() => {
    if (photoURL !== "") {
      setAvatarLink(photoURL);
    }
  }, [photoURL]);

  useEffect(() => {
    if (photoFile !== "") {
      setAvatarLink(photoFile);
    }
  }, [photoFile]);

  return (
    <nav className={style.container}>
      <div className={style.avatar} ref={avatarRef} data-target="dropdown1">
        <img src={avatarLink} alt="avatar" className={style.img} />
      </div>

      <ul id="dropdown1" className={style.menu}>
        <li>
          <NavLink
            exact
            className={style.link}
            activeClassName={style.link_active}
            to="/profile"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            className={style.link}
            activeClassName={style.link_active}
            to="/collections"
          >
            Collections
          </NavLink>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li onClick={logout}>
          <span className={style.link}>Logout</span>
        </li>
      </ul>
    </nav>
  );
}

export default connect(null, mDtP)(User);
