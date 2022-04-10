import type { ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import hasComplexChildren from './hasComplexChildren.js';

const deepMap = (
  children: ReactNode | ReactNode[],
  deepMapFn: (child: ReactNode, index?: number, children?: ReactNode[]) => ReactNode,
): ReactNode[] =>
  Children.toArray(children).map((child: ReactNode, index: number, mapChildren: ReactNode[]) => {
    if (isValidElement(child) && hasComplexChildren(child)) {
      // Clone the child that has children and map them too
      return deepMapFn(
        cloneElement(child, {
          ...child.props,
          children: deepMap(child.props.children, deepMapFn),
        }),
      );
    }
    return deepMapFn(child, index, mapChildren);
  });

export default deepMap;
