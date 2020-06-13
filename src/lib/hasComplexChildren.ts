import { Children, isValidElement, ReactElement, ReactNode } from 'react';
import hasChildren from './hasChildren';

const hasComplexChildren = (
  element: ReactNode,
): element is ReactElement<{ children: ReactNode[] }> =>
  isValidElement(element) &&
  hasChildren(element) &&
  Children.toArray(element.props.children).reduce(
    (response: boolean, child: ReactNode): boolean => response || isValidElement(child),
    false,
  );

export default hasComplexChildren;
