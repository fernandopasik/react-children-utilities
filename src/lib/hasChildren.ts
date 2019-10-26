import { isValidElement, ReactNode } from 'react';

const hasChildren = (element: ReactNode): boolean =>
  isValidElement(element) && Boolean(element.props.children);

export default hasChildren;
