import { Children, cloneElement } from 'react';

const hasChildren = child => child && child.props && child.props.children;
const hasComplexChildren = child => hasChildren(child) && typeof child.props.children === 'object';

export default {

  ...Children,

  /**
   * Filter children
   * @param   {object} children - React component children
   * @param {function} filterFn - Array filter callback
   * @returns  {array}          - Filtered children
   */
  filter(children, filterFn) {
    return Children
      .toArray(children)
      .filter(filterFn);
  },

  /**
   * Filter children and its children
   * @param   {object} children     - React component children
   * @param {function} deepFilterFn - Deep Filter callback
   */
  deepFilter(children, deepFilterFn) {
    return Children
      .toArray(children)
      .filter(deepFilterFn)
      .map((child) => {
        if (hasComplexChildren(child)) {
          // Clone the child that has children and filter them too
          return cloneElement(child, {
            ...child.props,
            children: this.deepFilter(child.props.children, deepFilterFn),
          });
        }
        return child;
      });
  },

  /**
   * Group children by type and puts in a rest key
   * the types not indicated
   * @param   {object} children - React component children
   * @param {string[]} types    - Array of child types
   * @param   {string} rest     - Object key name where non types will be saved
   * @returns {object}          - Map of the types and rest
   */
  groupByType(children, types, rest) {
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
  },

  /**
   * Map children and its children
   * @param   {object} children  - React component children
   * @param {function} deepMapFn - Deep Map callback
   * @returns  {array}           - Deep Mapped children
   */
  deepMap(children, deepMapFn) {
    return Children
      .map(children, (child) => {
        if (hasComplexChildren(child)) {
          // Clone the child that has children and map them too
          return deepMapFn(cloneElement(child, {
            ...child.props,
            children: this.deepMap(child.props.children, deepMapFn),
          }));
        }
        return deepMapFn(child);
      });
  },

  /**
   * ForEach children and its children
   * @param   {object} children      - React component children
   * @param {function} deepForEachFn - Deep Map callback
   */
  deepForEach(children, deepForEachFn) {
    Children
      .forEach(children, (child) => {
        if (hasComplexChildren(child)) {
          // Each inside the child that has children
          this.deepForEach(child.props.children, deepForEachFn);
        }
        deepForEachFn(child);
      });
  },

  /**
   * Find in children and its children
   * @param   {object} children   - React component children
   * @param {function} deepFindFn - Deep Map callback
   * @returns  {array}            - Children found
   */
  deepFind(children, deepFindFn) {
    return Children
      .toArray(children)
      .find((child) => {
        if (hasComplexChildren(child)) {
          // Find inside the child that has children
          return this.deepFind(child.props.children, deepFindFn);
        }
        return deepFindFn(child);
      });
  },

  /**
   * Get only the text in children and its children
   * @param   {object} children - React component children
   * @returns  {string}         - Text of all children
   */
  onlyText(children) {
    return Children
      .toArray(children)
      .reduce((flattened, child) => [
        ...flattened,
        hasChildren(child) ? this.onlyText(child.props.children) : child,
      ], [])
      .join('');
  },
};
