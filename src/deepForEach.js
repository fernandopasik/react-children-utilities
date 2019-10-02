import { Children } from 'react';
import hasComplexChildren from './hasComplexChildren';

const deepForEach = (children, deepForEachFn) => {
  Children.forEach(children, (child) => {
    if (hasComplexChildren(child)) {
      // Each inside the child that has children
      deepForEach(child.props.children, deepForEachFn);
    }
    deepForEachFn(child);
  });
};

export default deepForEach;
