// @flow
import { Children, cloneElement } from 'react';
import type { Element, Node } from 'react';

const hasChildren = (child: Element<any>): boolean => Boolean(
  child && child.props && child.props.children,
);

const hasComplexChildren = (child: Element<any>): boolean => hasChildren(child)
  && typeof child.props.children === 'object';

/**
 * Filter children
 * @param   {object} children - React component children
 * @param {function} filterFn - Array filter callback
 * @returns  {array}          - Filtered children
 */
export const filter = (children: number, filterFn: (child: Node) => boolean): Node => {
  return Children
    .toArray(children)
    .filter(filterFn);
};

/**
 * Filter children and its children
 * @param   {object} children     - React component children
 * @param {function} deepFilterFn - Deep Filter callback
 * @returns  {array}              - Deep Filtered children
 */
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

/**
 * Group children by type and puts in a rest key
 * the types not indicated
 * @param   {object} children - React component children
 * @param {string[]} types    - Array of child types
 * @param   {string} rest     - Object key name where non types will be saved
 * @returns {object}          - Map of the types and rest
 */
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

/**
 * Map children and its children
 * @param   {object} children  - React component children
 * @param {function} deepMapFn - Deep Map callback
 * @returns  {array}           - Deep Mapped children
 */
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

/**
 * ForEach children and its children
 * @param   {object} children      - React component children
 * @param {function} deepForEachFn - Deep Map callback
 */
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

/**
 * Find in children and its children
 * @param   {object} children   - React component children
 * @param {function} deepFindFn - Deep Map callback
 * @returns  {array}            - Children found
 */
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

/**
 * Get only the text in children and its children
 * @param   {object} children - React component children
 * @returns  {string}         - Text of all children
 */
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
};
