import type { ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import hasComplexChildren from './hasComplexChildren.js';

const deepFilter = (
  children: ReactNode | ReactNode[],
  deepFilterFn: (child: ReactNode, index?: number, children?: ReactNode[]) => boolean,
): ReactNode[] =>
  Children.toArray(children)
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

export default deepFilter;
