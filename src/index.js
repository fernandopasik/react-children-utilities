// @flow
import { Children, cloneElement } from 'react';
import type { Element, Node } from 'react';

export const hasChildren = (child: Element<any>): boolean => Boolean(
  child && child.props && child.props.children,
);

export const hasComplexChildren = (child: Element<any>): boolean => hasChildren(child)
  && typeof child.props.children === 'object';

export const filter = (children: number, filterFn: (child: Node) => boolean): Node => {
  return Children
    .toArray(children)
    .filter(filterFn);
};

export const deepFilter = (children: Node, deepFilterFn: (child: Node) => boolean): Node => {
  return Children
    .toArray(children)
    .filter(deepFilterFn)
    .map((child) => {
      if (hasComplexChildren(child)) {
        // Clone the child that has children and filter them too
        return cloneElement(child, {
          ...child.props,
          children: deepFilter(child.props.children, deepFilterFn),
        });
      }
      return child;
    });
};

export const groupByType = (children: Node, types: Array<string>, rest: string): Object => {
  return Children
    .toArray(children)
    .reduce((group, child) => {
      const isGrouped = types.includes(child.type);
      const addChild = isGrouped ? child.props.children : child;
      const key = isGrouped ? child.type : rest;

      return {
        ...group,
        [key]: [...(group[key] || []), addChild],
      };
    }, {});
};

export const deepMap = (children: Node, deepMapFn: (child: Node) => Node): Node => {
  return Children
    .map(children, (child) => {
      if (hasComplexChildren(child)) {
        // Clone the child that has children and map them too
        return deepMapFn(cloneElement(child, {
          ...child.props,
          children: deepMap(child.props.children, deepMapFn),
        }));
      }
      return deepMapFn(child);
    });
};

export const deepForEach = (children: Node, deepForEachFn: (child: Node) => void): void => {
  Children
    .forEach(children, (child) => {
      if (hasComplexChildren(child)) {
        // Each inside the child that has children
        deepForEach(child.props.children, deepForEachFn);
      }
      deepForEachFn(child);
    });
};

export const deepFind = (children: Node, deepFindFn: (child: Node) => boolean): Node | void => {
  return Children
    .toArray(children)
    .find((child) => {
      if (hasComplexChildren(child)) {
        // Find inside the child that has children
        return deepFind(child.props.children, deepFindFn);
      }
      return deepFindFn(child);
    });
};

export const onlyText = (children: Node): string => {
  return Children
    .toArray(children)
    .reduce((flattened, child) => [
      ...flattened,
      hasChildren(child) ? onlyText(child.props.children) : child,
    ], [])
    .join('');
};

export default {
  ...Children,
  filter,
  deepFilter,
  groupByType,
  deepMap,
  deepForEach,
  deepFind,
  onlyText,
  hasChildren,
  hasComplexChildren,
};
