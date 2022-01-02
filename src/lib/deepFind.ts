import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import hasComplexChildren from './hasComplexChildren.js';

const deepFind = (
  children: ReadonlyDeep<ReactNode | ReactNode[]>,
  deepFindFn: (
    child: ReadonlyDeep<ReactNode>,
    index?: number,
    children?: ReadonlyDeep<ReactNode[]>,
  ) => boolean,
): ReactNode | undefined => {
  // eslint-disable-next-line @typescript-eslint/init-declarations
  let found;

  Children.toArray(children).find(
    (child: ReadonlyDeep<ReactNode>, index: number, findChildren: ReadonlyDeep<ReactNode[]>) => {
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
    },
  );

  return found;
};

export default deepFind;
