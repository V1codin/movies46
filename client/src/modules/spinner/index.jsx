import React from "react";
import "materialize-css";

function Spinner(props) {
  const { isShown } = props;
  return (
    <div className={`progress ${isShown ? "" : "hide"}`}>
      <div className="indeterminate"></div>
    </div>
  );
}

export default Spinner;
