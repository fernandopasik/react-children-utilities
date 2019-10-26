import { ReactNode, isValidElement } from 'react';

const hasChildren = (element: ReactNode): boolean =>
  isValidElement(element) && Boolean(element.props.children);

export default hasChildren;
