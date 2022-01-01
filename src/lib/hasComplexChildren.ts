import type { ReactElement, ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import hasChildren from './hasChildren.js';

const hasComplexChildren = (
  element: ReadonlyDeep<ReactNode>,
): element is ReactElement<{ children: ReactNode | ReactNode[] }> =>
  isValidElement(element) &&
  hasChildren(element) &&
  Children.toArray(element.props.children).reduce(
    (response: boolean, child: ReadonlyDeep<ReactNode>): boolean =>
      response || isValidElement(child),
    false,
  );

export default hasComplexChildren;
