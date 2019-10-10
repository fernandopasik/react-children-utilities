import { Children, isValidElement, ReactNode, ReactElement } from 'react';

import hasChildren from './hasChildren';

const hasComplexChildren = (element: ReactNode): boolean =>
  hasChildren(element) &&
  Children.toArray((element as ReactElement).props.children).reduce(
    (response: boolean, child: ReactNode) => response || isValidElement(child),
    false,
  );

export default hasComplexChildren;
