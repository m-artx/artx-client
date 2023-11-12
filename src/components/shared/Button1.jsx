import React from 'react';

const Button = ({ onClick, label, type, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`p-2 bg-black text-white rounded-sm mx-3 ${className}`}
      
    >
      {label}
    </button>
  );
};

export default Button;
