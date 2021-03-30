import { combineReducers } from "redux";
import auth from "./auth.reducer.js";
import movies from "./movies.reducer.js";

export default combineReducers({ auth, movies });
