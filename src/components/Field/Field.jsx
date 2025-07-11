import { forwardRef } from 'react';
export const Field = forwardRef((props, ref) => {
  return <input ref={ref} {...props}></input>;
});
