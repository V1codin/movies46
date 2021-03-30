import React from "react";
import Login from "./components/signIn";
import User from "./components/user";

import style from "./styles.module.css";
import list from "./setts.json";
import GamburgerBtn from "../../../modules/gamburgerMenu";

import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { useMemo } from "react";

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchValueAction: (value) => {
      return dispatch({
        type: "SET_SEARCH_VALUE",
        searchValue: value,
      });
    },
  };
};

function Header(props) {
  const { setSearchValueAction, isLogged, user } = props;

  const [searchValue, setSearchValue] = useState("");

  const [isShown, setIsShown] = useState(null);

  const history = useHistory();

  const headerClassHandler = (checker) => {
    if (checker === true) {
      return `${style.header} ${style.header_rollIn}`;
    } else if (checker === false) {
      return `${style.header} ${style.header_rollOut}`;
    } else if (checker === null) {
      return style.header;
    }
  };

  const headerClass = useMemo(() => headerClassHandler(isShown), [isShown]);

  const inputHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();

    setSearchValueAction(searchValue);

    setSearchValue("");
    history.push("/movies/search");
  };

  return (
    <>
      <GamburgerBtn menuClass={style.gamburgerView} checkerFn={setIsShown} />
      <header className={headerClass}>
        <div className={style.wrapper}>
          <nav>
            <ul className={style.list}>
              {list.map((item) => {
                return (
                  <li key={item.id}>
                    <NavLink
                      exact
                      className={style.link}
                      activeClassName={style.link_active}
                      to={item.href}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <div className={style.userBlock}>
              <form onSubmit={searchSubmit} className={style.form}>
                <input
                  onChange={inputHandler}
                  value={searchValue}
                  type="search"
                  placeholder="Search..."
                  className={style.search}
                />
              </form>
              {isLogged ? <User user={user} /> : <Login />}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
