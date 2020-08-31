import type { ReactElement, ReactNode } from 'react';
import { isValidElement } from 'react';

const hasChildren = (element: ReactNode): element is ReactElement<{ children: ReactNode[] }> =>
  isValidElement<{ children?: ReactNode[] }>(element) && Boolean(element.props.children);

export default hasChildren;
