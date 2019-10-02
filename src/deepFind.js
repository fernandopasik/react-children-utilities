import { Children } from 'react';
import hasComplexChildren from './hasComplexChildren';

const deepFind = (children, deepFindFn) => {
  let found;
  Children.toArray(children).find((child) => {
    if (hasComplexChildren(child)) {
      // Find inside the child that has children
      found = deepFind(child.props.children, deepFindFn);
      return typeof found !== 'undefined';
    }
    if (deepFindFn(child)) {
      found = child;
      return true;
    }
    return false;
  });
  return found;
};

export default deepFind;
