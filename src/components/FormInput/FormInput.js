import React from "react";
import "./FormInputStyle.scss";
const FormInput = ({
  name,
  label,
  placeholder,
  register,
  required,
  pattern,
  minLength,
  maxLength,
  error,
  errorMessage,
}) => {
  return (
    <>
      <input
        type="text"
        className={`input ${error && "error"}`}
        placeholder={placeholder}
        {...register(name, {
          required: required && "This field is required",
          pattern: pattern && {
            value: pattern,
            message: "Please enter a valid value",
          },
          minLength: minLength && {
            value: minLength,
            message: `Minimum length is ${minLength}`,
          },
          maxLength: maxLength && {
            value: maxLength,
            message: `Maximum length is ${maxLength}`,
          },
        })}
      />
      <label className="placeholder">{label}</label>
      {error && <span className="error-alert">{errorMessage}</span>}
    </>
  );
};

export default FormInput;
