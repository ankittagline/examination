import React from "react";

const Button = ({ onClick, value, type, className, disabled }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
