import type { ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import hasComplexChildren from './hasComplexChildren.js';

function deepFilter(
  children: ReadonlyDeep<ReactNode | ReactNode[]>,
  deepFilterFn: (
    child: ReadonlyDeep<ReactNode>,
    index?: number,
    children?: ReadonlyDeep<ReactNode[]>,
  ) => boolean,
): ReactNode[] {
  return Children.toArray(children)
    .filter(deepFilterFn)
    .map((child: ReadonlyDeep<ReactNode>) => {
      if (isValidElement(child) && hasComplexChildren(child)) {
        // Clone the child that has children and filter them too
        return cloneElement(child, {
          ...child.props,
          children: deepFilter(child.props.children, deepFilterFn),
        });
      }
      return child;
    });
}
export default deepFilter;
