import { combineReducers } from "redux";
import movies from "../../components/Popularity/setts/reducer";
import auth from "../../components/Static/Authorization/module/setts/reducer";

export default combineReducers({ movies, auth });
