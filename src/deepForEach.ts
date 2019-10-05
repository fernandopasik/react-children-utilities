import { Children, ReactElement, ReactNode } from 'react';
import hasComplexChildren from './hasComplexChildren';

interface ForEachFunction {
  (child: ReactNode, index?: number, children?: ReactNode[]): void;
}

const deepForEach = (children: ReactNode, deepForEachFn: ForEachFunction): void => {
  Children.forEach(children, (child) => {
    if (hasComplexChildren(child)) {
      // Each inside the child that has children
      deepForEach((child as ReactElement).props.children, deepForEachFn);
    }
    deepForEachFn(child);
  });
};

export default deepForEach;
