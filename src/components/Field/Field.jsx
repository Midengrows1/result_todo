import React from 'react';

export const Field = ({ type, value = '', onChange, ...props }) => {
  return <input type={type} value={value} onChange={onChange} {...props}></input>;
};
