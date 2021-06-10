import React from 'react'

const Button = ({ handleClick, value, type, className }) => {
    return (
      <button  className={className} onClick={handleClick} type={type}>
        {value}
      </button>
    );
   }

export default Button
