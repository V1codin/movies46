import React from "react";

import avatarThumbnail from "../../../Static/Img/avatar_thumbnail.jpg";
import style from "./styles.module.css";

import setOptions from "../../../../system/helpers/setDefaultRequestOptions";

import { useState, useRef } from "react";
import { useAlert } from "../../../../system/hooks/alert.hook";
import { useRequest } from "../../../../system/hooks/request.hook";
import { getFileUrl, getFormData } from "../../../../system/helpers/dataHelper";

function UserProfile(props) {
  const { user, updateUser } = props;

  const { req } = useRequest();
  const _alert = useAlert();

  const [state, setState] = useState({
    displayName: user.userData.displayName,

    photoURL: user.userData.photoURL,

    email: user.userData.email,

    phoneNumber: "",
    photoFile: user.userData.photoFile,
  });
  const fileInputRef = useRef(null);

  const fileChange = (e) => {
    getFileUrl(e.target, _alert, (src) => {
      setState({
        ...state,
        photoFile: src,
        photoURL: "",
      });
    });
  };

  const fileInputHandler = () => {
    const fileInput = fileInputRef.current;
    fileInput.click();

    fileInput.onchange = fileChange;
  };

  const changeHandler = (e) => {
    const {
      target: { name, value },
    } = e;

    setState({
      ...state,
      [name]: value,
    });
  };

  const clickHandler = (e) => {
    e.preventDefault();

    const data = getFormData(e.target);

    if (!data.photoURL) {
      data.photoFile = state.photoFile;
    } else {
      data.photoFile = "";
    }

    req(
      setOptions("/auth/update/userInfo", data, (res) => {
        updateUser(res);
        _alert("User was successfully updated", false);
      })
    );
  };

  return (
    <div className={style.app}>
      <h2>Your profile</h2>
      <form action="/" className={style.form} onSubmit={clickHandler}>
        <div className={style.row} name="displayName">
          <span>Name</span>
          <div className={style.wrapper}>
            <input
              type="text"
              className={style.input}
              name="displayName"
              value={state.displayName}
              onChange={changeHandler}
            />
            <i className={`material-icons ${style.edit}`}>edit</i>
          </div>
        </div>
        <div name="photoURL" className={style.row}>
          <span>Avatar Link</span>
          <div className={style.wrapper}>
            <input
              type="text"
              className={style.input}
              name="photoURL"
              value={state.photoURL}
              onChange={changeHandler}
              placeholder={
                !state.photoFile && !state.photoURL ? "url" : "Uploaded avatar"
              }
            />
            <input
              type="file"
              name="photoFile"
              className={style.input_file}
              ref={fileInputRef}
              accept="image/*"
              hidden
            />

            <div className={style.avatar} onClick={fileInputHandler}>
              <img
                src={
                  state.photoURL
                    ? state.photoURL
                    : state.photoFile
                    ? state.photoFile
                    : avatarThumbnail
                }
                alt="avatar"
                className={style.img}
              />
            </div>
          </div>
        </div>
        <div name="email" className={style.row}>
          <span>Email</span>
          <div className={style.wrapper}>
            <input
              type="text"
              className={style.input}
              name="email"
              value={state.email}
              disabled
            />
            <i className={`material-icons ${style.edit_dis}`}>edit</i>
          </div>
        </div>
        <div name="phoneNumber" className={style.row}>
          <span>Phone Number</span>
          <div className={style.wrapper}>
            <input
              type="text"
              className={style.input}
              name="phoneNumber"
              pattern="[0-9]+"
            />
            <i className={`material-icons ${style.edit}`}>edit</i>
          </div>
        </div>
        <button className="waves-effect waves-light btn-small">Send</button>
      </form>
    </div>
  );
}

export default UserProfile;
