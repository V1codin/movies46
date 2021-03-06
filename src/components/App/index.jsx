import React from "react";
import Router from "../Static/Router";
import Header from "../Static/Header";
import style from "./styles.module.css";

function App() {
  return (
    <>
      <Header />
      <main className={style.main}>
        <Router />
      </main>
    </>
  );
}
export default App;
