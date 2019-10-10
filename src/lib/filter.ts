import { Children, ReactNode } from 'react';

export interface FilterFunction {
  (child: ReactNode, index?: number, children?: ReactNode[]): boolean;
}

const filter = (children: ReactNode, filterFn: FilterFunction): ReactNode[] => {
  return Children.toArray(children).filter(filterFn);
};

export default filter;
