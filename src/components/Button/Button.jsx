import React from "react";
import "./Button.scss";

function Button({ color, children, onClick }) {
  return (
    <button className={`btn btn-${color}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
