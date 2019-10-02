import { Children, cloneElement } from 'react';
import hasComplexChildren from './hasComplexChildren';

const deepMap = (children, deepMapFn) => {
  return Children.map(children, (child) => {
    if (hasComplexChildren(child)) {
      // Clone the child that has children and map them too
      return deepMapFn(
        cloneElement(child, {
          ...child.props,
          children: deepMap(child.props.children, deepMapFn),
        }),
      );
    }
    return deepMapFn(child);
  });
};

export default deepMap;
