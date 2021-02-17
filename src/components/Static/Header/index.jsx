import React from "react";
import style from "./styles.module.css";
import list from "./setts.json";
import req from "../../../system/Request/request";
import Login from "./components/signIn";
import GamburgerBtn from "../../../modules/menuBtn/";

import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { useMemo } from "react";

const mapDispatchToProps = (dispatch) => {
  return {
    moviesSearchAction: (moviesResponse, value) => {
      return dispatch({
        type: "GET_MOVIES_BY_SEARCH",
        movies: moviesResponse,
        searchValue: value,
      });
    },
    clearAction: () => dispatch({ type: "CLEAR" }),
  };
};

function Header(props) {
  const { moviesSearchAction, clearAction } = props;

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
    clearAction();
    const moviesHandler = req.getListFromSearch(
      searchValue,
      moviesSearchAction
    );
    moviesHandler();
    setSearchValue("");

    history.push("/search");
  };

  return (
    <>
      <GamburgerBtn menuClass={style.gamburgerView} checkerFn={setIsShown} />
      <header className={headerClass}>
        <div className={style.header__wrapper}>
          <nav>
            <ul className={style.header__list}>
              {list.map((item) => {
                return (
                  <li key={item.id}>
                    <NavLink
                      exact
                      className={style.nav__link}
                      activeClassName={style.nav__link_active}
                      to={item.href}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <form onSubmit={searchSubmit} className={style.header__search}>
              <input
                onChange={inputHandler}
                value={searchValue}
                type="search"
                placeholder="Search..."
                className={style.search}
              />
            </form>
            <Login />
          </nav>
        </div>
      </header>
    </>
  );
}
export default connect(null, mapDispatchToProps)(Header);
