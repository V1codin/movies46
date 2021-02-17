import React from "react";
import style from "./styles.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function UserValues(props) {
  const {
    state,
    valueName,
    userData,
    customClasses,
    avatarInputRef,
    fileHandler,
  } = props;

  const value = state[valueName].value;

  if (valueName === "photoURL") {
    const useSylesForFav = makeStyles((theme) => ({
      arrow: {
        color: theme.palette.common.black,
      },
      tooltip: {
        backgroundColor: "#2634ff",
        maxWidth: "160px",
        fontSize: "0.9em",
        textAlign: "center",
      },
    }));

    const FavoritToolTip = (props) => {
      const classes = useSylesForFav();
      return (
        <Tooltip
          arrow
          classes={classes}
          {...props}
          TransitionComponent={Zoom}
        />
      );
    };

    const avatarBtnHandler = () => {
      const input = avatarInputRef.current;
      input.click();

      input.onchange = fileHandler;
    };

    return (
      <div className={style.item}>
        <FavoritToolTip title="Click to download your image">
          <Avatar
            alt={value === "Not Set" ? "" : state[valueName].name}
            src={userData[valueName].value}
            className={customClasses.avatar}
            onClick={avatarBtnHandler}
          />
        </FavoritToolTip>
        <input
          type="file"
          name="uploadAvatar"
          accept=".png, .jpg, .jpeg"
          className={style.avatarInput}
          ref={avatarInputRef}
        />
      </div>
    );
  }

  return (
    <span
      className={style.article + " " + style.item + " " + style.article_colG}
    >
      {value}
    </span>
  );
}

export default UserValues;
