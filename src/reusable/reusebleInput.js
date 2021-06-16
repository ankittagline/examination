import React from "react";

const Input = ({ handleChange,  errorMessage,  label,  errorValue,  ...props}) => {
  return (
    <div>
      {label && <label htmlFor="app-input-field">{label}</label>}
      <input {...props} onChange={(index) => handleChange(index)} />
      {errorValue && <label style={{ color: "red" }}>{errorMessage}</label>}
    </div>
  );
};
export default Input;
