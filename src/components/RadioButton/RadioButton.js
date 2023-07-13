import React from "react";
import "./RadioButton.scss";
const RadioButton = ({ value, label, register, name, checked, onChange }) => {
  return (
    <label className="input-control" htmlFor={value}>
      <input
        type="radio"
        className="radio-input"
        value={value}
        id={value}
        {...register(name, { required: true })}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default RadioButton;
