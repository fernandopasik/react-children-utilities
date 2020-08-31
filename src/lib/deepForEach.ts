import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import hasComplexChildren from './hasComplexChildren';

export type ForEachFunction = (child: ReactNode, index?: number) => void;

const deepForEach = (children: ReactNode, deepForEachFn: ForEachFunction): void => {
  Children.forEach(children, (child: ReactNode, index: number) => {
    if (isValidElement(child) && hasComplexChildren(child)) {
      // Each inside the child that has children
      deepForEach(child.props.children, deepForEachFn);
    }
    deepForEachFn(child, index);
  });
};

export default deepForEach;
