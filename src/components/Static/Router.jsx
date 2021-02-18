import React from "react";
import { Switch, Route } from "react-router-dom";
import Pop from "../Popularity/";
// import Home from "../Home/";
import Rate from "../Rating/";
import Search from "../Search/";
import Profile from "../Profile/";
import UserAccount from "../User/";
import Auth from "../Static/Authorization/";
import SingleMovie from "../SingleMovie/";

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Pop} />
      {/* <Route exact path="/" component={Home} /> */}
      <Route exact path="/popular" component={Pop} />
      <Route exact path="/rating" component={Rate} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/account" component={UserAccount} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/auth/:type" component={Auth} />
      <Route exact path="/movies/:type" component={SingleMovie} />
    </Switch>
  );
}
