import type { ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import hasComplexChildren from './hasComplexChildren.js';

export type FilterFunction = (child: ReactNode, index?: number, children?: ReactNode[]) => boolean;

const deepFilter = (children: ReactNode, deepFilterFn: FilterFunction): ReactNode[] => {
  return Children.toArray(children)
    .filter(deepFilterFn)
    .map((child: ReactNode) => {
      if (isValidElement(child) && hasComplexChildren(child)) {
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
