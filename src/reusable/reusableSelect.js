import React from "react";

const Select = ({
  handleChange,
  errorMessage,
  label,
  errorValue,
  option,
  ...props
}) => {
  return (
    <div>
      {label && <label htmlFor="app-input-field">{label}</label>}
      <select {...props} onChange={handleChange}>
        <option value=""> Select Subject </option>
        {option.map((value) => (
          <option key={value}> {value}</option>
        ))}
      </select>
      {errorValue && <label style={{ color: "red" }}>{errorMessage}</label>}
    </div>
  );
};
export default Select;
