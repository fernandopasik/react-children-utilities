import { Children, isValidElement, type ReactNode } from 'react';
import hasComplexChildren from './hasComplexChildren.ts';

const deepFind = (
  children: ReactNode | ReactNode[],
  deepFindFn: (child: ReactNode, index?: number, children?: ReactNode[]) => boolean,
): ReactNode | undefined => {
  // eslint-disable-next-line @typescript-eslint/init-declarations
  let found;

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  Children.toArray(children).find((child: ReactNode, index: number, findChildren: ReactNode[]) => {
    if (deepFindFn(child, index, findChildren)) {
      found = child;
      return true;
    }

    if (isValidElement(child) && hasComplexChildren(child)) {
      // Find inside the child that has children
      found = deepFind(child.props.children, deepFindFn);
      return typeof found !== 'undefined';
    }

    return false;
  });

  return found;
};

export default deepFind;
