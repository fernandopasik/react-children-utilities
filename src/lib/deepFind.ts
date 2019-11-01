import { Children, isValidElement, ReactNode } from 'react';
import hasComplexChildren from './hasComplexChildren';

export type FindFunction = (child: ReactNode, index?: number, children?: ReactNode[]) => boolean;

const deepFind = (children: ReactNode, deepFindFn: FindFunction): ReactNode | undefined => {
  let found;

  Children.toArray(children).find((child: ReactNode) => {
    if (isValidElement(child) && hasComplexChildren(child)) {
      // Find inside the child that has children
      found = deepFind(child.props.children, deepFindFn);
      return typeof found !== 'undefined';
    }

    if (deepFindFn(child)) {
      found = child;
      return true;
    }

    return false;
  });

  return found;
};

export default deepFind;
