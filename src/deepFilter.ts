import { Children, cloneElement, ReactElement, ReactNode } from 'react';
import hasComplexChildren from './hasComplexChildren';

interface FilterFunction {
  (child: ReactNode, index?: number, children?: ReactNode[]): boolean;
}

const deepFilter = (children: ReactNode, deepFilterFn: FilterFunction) => {
  return Children.toArray(children)
    .filter(deepFilterFn)
    .map((child) => {
      if (hasComplexChildren(child)) {
        // Clone the child that has children and filter them too
        return cloneElement(child as ReactElement, {
          ...(child as ReactElement).props,
          children: deepFilter((child as ReactElement).props.children, deepFilterFn),
        });
      }
      return child;
    });
};

export default deepFilter;
