import React from "react";

const Button = ({ onClick, value, type, className }) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {value}
    </button>
  );
};

export default Button;
