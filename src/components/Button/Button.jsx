import React from 'react';

export const Button = ({onClick, children, ...props }) => {
  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
};
