import React from "react";

const Button = ({ onClick, value, type, className, ...props }) => {
  return (
    <button className={className} onClick={onClick} type={type} {...props}>
      {value}
    </button>
  );
};

export default Button;
