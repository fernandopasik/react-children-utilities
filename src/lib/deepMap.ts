import type { ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import hasComplexChildren from './hasComplexChildren.js';

function deepMap(
  children: ReadonlyDeep<ReactNode | ReactNode[]>,
  deepMapFn: (
    child: ReadonlyDeep<ReactNode>,
    index?: number,
    children?: ReadonlyDeep<ReactNode[]>,
  ) => ReactNode,
): ReactNode[] {
  return Children.toArray(children).map(
    (child: ReadonlyDeep<ReactNode>, index: number, mapChildren: ReadonlyDeep<ReactNode[]>) => {
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
    },
  );
}
export default deepMap;
