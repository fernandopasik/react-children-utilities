import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';
import hasChildren from './hasChildren.ts';

const hasComplexChildren = (
  element: ReactNode,
): element is ReactElement<{ children: ReactNode | ReactNode[] }> =>
  isValidElement(element) &&
  hasChildren(element) &&
  Children.toArray(element.props.children).reduce(
    (response: boolean, child: ReactNode): boolean => response || isValidElement(child),
    false,
  );

export default hasComplexChildren;
