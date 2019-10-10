import { ReactNode, ReactElement } from 'react';

const hasChildren = (child: ReactNode): boolean =>
  Boolean(child && (child as ReactElement).props && (child as ReactElement).props.children);

export default hasChildren;
