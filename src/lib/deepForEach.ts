import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import hasComplexChildren from './hasComplexChildren.js';

function deepForEach(
  children: ReadonlyDeep<ReactNode | ReactNode[]>,
  deepForEachFn: (child: ReadonlyDeep<ReactNode>, index?: number) => void,
): void {
  Children.forEach(children, (child: ReadonlyDeep<ReactNode>, index: number) => {
    if (isValidElement(child) && hasComplexChildren(child)) {
      // Each inside the child that has children
      deepForEach(child.props.children, deepForEachFn);
    }
    deepForEachFn(child, index);
  });
}

export default deepForEach;
