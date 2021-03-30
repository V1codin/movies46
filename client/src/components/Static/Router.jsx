import React from "react";
import Home from "../Home/";
import Pop from "../Popularity/";
import Auth from "../Static/Authorization/";
import Rate from "../Rating/";
import Search from "../Search/";
import Profile from "../Profile/";
import SingleMovie from "../SingleMovie";
/*
import UserAccount from "../User/";
*/
import { Switch, Route, Redirect } from "react-router-dom";
export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movies/pop" component={Pop} />
      <Route exact path="/auth/:type" component={Auth} />
      <Route exact path="/movies/rate" component={Rate} />
      <Route exact path="/movies/search" component={Search} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/movies/card/:type" component={SingleMovie} />
      {/* 
      <Route exact path="/account" component={UserAccount} />
    */}
      <Redirect to="/" />
    </Switch>
  );
}
