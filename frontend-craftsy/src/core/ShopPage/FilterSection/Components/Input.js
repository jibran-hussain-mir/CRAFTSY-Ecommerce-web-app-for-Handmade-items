import React from "react";

function Input({ handleChange, handleCategoryChange, value, title }) {
  return (
    <label className="sidebar-label-container">
      <input
        onChange={handleCategoryChange}
        type="radio"
        value={value}
        name="test"
      />
      <span className="checkmark"></span>
      {title}
    </label>
  );
}

export default Input;
