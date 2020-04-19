import { Children, cloneElement, isValidElement, ReactNode } from 'react';
import hasComplexChildren from './hasComplexChildren';

export type MapFunction = (
  child: ReactNode,
  index?: number,
  children?: readonly ReactNode[],
) => ReactNode;

const deepMap = (children: ReactNode, deepMapFn: MapFunction): ReactNode[] => {
  return Children.toArray(children).map(
    (child: ReactNode, index: number, mapChildren: readonly ReactNode[]) => {
      if (isValidElement(child) && hasComplexChildren(child)) {
        // Clone the child that has children and map them too
        return deepMapFn(
          cloneElement(child, {
            ...child.props,
            children: deepMap(child.props.children, deepMapFn),
          }),
        );
      }
      return deepMapFn(child, index, mapChildren);
    },
  );
};

export default deepMap;
