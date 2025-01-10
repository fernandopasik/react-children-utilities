import { Children, cloneElement, isValidElement, type ReactNode } from 'react';
import hasComplexChildren from './hasComplexChildren.ts';

const deepFilter = (
  children: ReactNode | ReactNode[],
  deepFilterFn: (child: ReactNode, index?: number, children?: ReactNode[]) => boolean,
): ReactNode[] =>
  Children.toArray(children)
    .filter(deepFilterFn)
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    .map((child: ReactNode) => {
      if (isValidElement(child) && hasComplexChildren(child)) {
        // Clone the child that has children and filter them too
        return cloneElement(child, {
          ...child.props,
          children: deepFilter(child.props.children, deepFilterFn),
        });
      }
      return child;
    });

export default deepFilter;
