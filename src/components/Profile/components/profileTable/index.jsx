import React from "react";
import style from "./styles.module.css";
import UserValue from "../user/";
import EditIcon from "@material-ui/icons/Edit";

import { Link, Input } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { mStP, mDtP } from "./setts/connectFns";
import { db, usersCollection } from "../../../../system/Setts/firebase";
import {
  getFormData,
  getFileUrl,
  createData,
} from "../../../Static/Authorization/setts/dataHelper";

function ProfileTable(props) {
  const { customClasses, reduxState, updateUser } = props;

  const [userData, setUserData] = useState({
    displayName: {
      name: "Name",
      value: "",
    },
    photoURL: {
      name: "Avatar",
      value: "",
    },
  });

  useEffect(() => {
    setUserData({
      ...createData(reduxState, userData),
    });

    // eslint-disable-next-line
  }, [reduxState]);

  const [inputs, setInputs] = useState({});

  const avatarInputRef = useRef(null);

  const edit = (e) => {
    const name = e.currentTarget.name;

    setInputs({
      ...inputs,
      [name]: !inputs[name] ?? true,
    });
  };

  const fileHandler = (e) => {
    getFileUrl(e.target, async (src) => {
      const userId = db.auth().currentUser.uid;

      try {
        await usersCollection.doc(userId).update({
          photoURL: src,
        });

        const userDoc = await usersCollection.doc(userId).get();
        const dataFromServer = userDoc.data();

        updateUser(dataFromServer);
      } catch (e) {
        console.log("update collection error for avatar", e);
      }
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    const data = getFormData(e.target);
    const userId = db.auth().currentUser.uid;

    try {
      await usersCollection.doc(userId).update({
        ...data,
      });

      const userDoc = await usersCollection.doc(userId).get();
      const dataFromServer = userDoc.data();

      updateUser(dataFromServer);
      setInputs({});
    } catch (e) {
      console.log("update collection error", e);
    }
  };

  return (
    <div className={style.container}>
      <h2>Your Profile</h2>
      <div className={style.table}>
        {Object.keys(userData).map((item, ind) => {
          const customKey = ind * Math.random() + 1;

          return (
            <div className={style.wrapper} key={customKey}>
              <div className={style.row}>
                <span className={style.article + " " + style.item}>
                  {userData[item].name}
                </span>
                <UserValue
                  state={userData}
                  valueName={item}
                  userData={userData}
                  customClasses={customClasses}
                  avatarInputRef={avatarInputRef}
                  fileHandler={fileHandler}
                />
                {item !== "email" ? (
                  <Link
                    component="button"
                    name={item}
                    className={
                      inputs[item]
                        ? customClasses.activeLink + " " + customClasses.item
                        : customClasses.link + " " + customClasses.item
                    }
                    variant="body1"
                    onClick={edit}
                  >
                    <EditIcon />
                  </Link>
                ) : null}
              </div>
              {inputs[item] && (
                <form
                  onSubmit={submit}
                  key={customKey}
                  className={style.avatarForm}
                >
                  <Input
                    type="text"
                    name={item}
                    className={customClasses.input}
                    placeholder={
                      item === "photoURL" ? "Avatar Link" : userData[item].name
                    }
                  />
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default connect(mStP, mDtP)(ProfileTable);
