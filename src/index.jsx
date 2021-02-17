import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Reducer from "./system/Setts/MainReducer";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(Reducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
