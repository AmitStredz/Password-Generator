import React from "react";

export default function Checkbox({ title, onChange }) {
  return (
    <div>
      <label className="checkbox" onChange={onChange}>
        <input type="checkbox"></input>
        {title}
      </label>
    </div>
  );
}
