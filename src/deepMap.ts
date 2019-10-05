import { Children, cloneElement, ReactElement, ReactNode } from 'react';
import hasComplexChildren from './hasComplexChildren';

interface MapFunction {
  (child: ReactNode, index?: number, children?: ReactNode[]): ReactNode;
}

const deepMap = (children: ReactNode, deepMapFn: MapFunction): ReactNode[] => {
  return Children.map(children, (child) => {
    if (hasComplexChildren(child)) {
      // Clone the child that has children and map them too
      return deepMapFn(
        cloneElement(child as ReactElement, {
          ...(child as ReactElement).props,
          children: deepMap((child as ReactElement).props.children, deepMapFn),
        }),
      );
    }
    return deepMapFn(child);
  });
};

export default deepMap;
