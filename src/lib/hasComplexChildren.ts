import { Children, isValidElement, ReactNode } from 'react';

import hasChildren from './hasChildren';

const hasComplexChildren = (element: ReactNode): boolean =>
  isValidElement(element) &&
  hasChildren(element) &&
  Children.toArray<ReactNode>(element.props.children).reduce(
    (response: boolean, child: ReactNode): boolean => response || isValidElement(child),
    false,
  );

export default hasComplexChildren;
