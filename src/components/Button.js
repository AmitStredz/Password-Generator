import React from "react";

export default function Button({ onClick, text, customClass }) {
  return (
    <button className={customClass} onClick={onClick}>
      {text}
    </button>
  );
}
