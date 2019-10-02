import { Children, cloneElement } from 'react';
import hasComplexChildren from './hasComplexChildren';

const deepFilter = (children, deepFilterFn) => {
  return Children.toArray(children)
    .filter(deepFilterFn)
    .map((child) => {
      if (hasComplexChildren(child)) {
        // Clone the child that has children and filter them too
        return cloneElement(child, {
          ...child.props,
          children: deepFilter(child.props.children, deepFilterFn),
        });
      }
      return child;
    });
};

export default deepFilter;
