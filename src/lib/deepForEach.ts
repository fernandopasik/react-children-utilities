import { Children, isValidElement, ReactNode } from 'react';
import hasComplexChildren from './hasComplexChildren';

export interface ForEachFunction {
  (child: ReactNode, index?: number, children?: ReactNode[]): void;
}

const deepForEach = (children: ReactNode, deepForEachFn: ForEachFunction): void => {
  Children.forEach(children, (child: ReactNode) => {
    if (isValidElement(child) && hasComplexChildren(child)) {
      // Each inside the child that has children
      deepForEach(child.props.children, deepForEachFn);
    }
    deepForEachFn(child);
  });
};

export default deepForEach;
