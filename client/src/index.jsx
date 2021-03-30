import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./components/App";

import reducer from "./system/reducers/main.reducer";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { loginWith } from "./system/helpers/setDefaultRequestOptions";

const store = createStore(reducer, composeWithDevTools());

loginWith(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
