import { Children } from 'react';

const filter = (children, filterFn) => {
  return Children.toArray(children).filter(filterFn);
};

export default filter;
