import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import hasComplexChildren from './hasComplexChildren.js';

const deepForEach = (
  children: ReactNode | ReactNode[],
  deepForEachFn: (child: ReactNode, index?: number) => void,
): void => {
  Children.forEach(children, (child: ReactNode, index: number) => {
    if (isValidElement(child) && hasComplexChildren(child)) {
      // Each inside the child that has children
      deepForEach(child.props.children, deepForEachFn);
    }
    deepForEachFn(child, index);
  });
};

export default deepForEach;
