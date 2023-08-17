import React, { useState, useEffect } from "react";

// const [priceRange, setPriceRange] = useState([]);
function Input({
  handleChange,
  handleCategoryChange,
  value,
  title,
  checked,
  handlePriceChange,
}) {
  const [localChecked, setLocalChecked] = useState(checked);

  useEffect(() => {
    setLocalChecked(checked);
  }, [checked]);

  const handleCheckboxChange = () => {
    setLocalChecked(!localChecked);
    if (handleCategoryChange) {
      handleCategoryChange(value);
    }
    if (handleChange) {
      handleChange(value); // Pass the selected price range value
    }
  };

  return (
    <label className="sidebar-label-container">
      <input
        onChange={handleCheckboxChange}
        type="checkbox" // Change radio to checkbox
        value={value}
        name="test"
        checked={localChecked || false} // Set a default value here
      />

      <span className="checkmark"></span>
      {title}
    </label>
  );
}

export default Input;
