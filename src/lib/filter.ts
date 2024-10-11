import { Children, type ReactNode } from 'react';

const filter = (
  children: ReactNode | ReactNode[],
  filterFn: (child: ReactNode, index?: number, children?: ReactNode[]) => boolean,
): ReactNode[] => Children.toArray(children).filter(filterFn);

export default filter;
