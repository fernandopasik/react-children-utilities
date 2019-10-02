import { Children } from 'react';

import deepFilter from './deepFilter';
import deepForEach from './deepForEach';
import deepMap from './deepMap';
import filter from './filter';
import hasChildren from './hasChildren';
import hasComplexChildren from './hasComplexChildren';

export const groupByType = (children, types, rest) => {
  return Children.toArray(children).reduce((group, child) => {
    const isGrouped = types.includes(child.type);
    const addChild = isGrouped ? child.props.children : child;
    const key = isGrouped ? child.type : rest;

    return {
      ...group,
      [key]: [...(group[key] || []), addChild],
    };
  }, {});
};

export const deepFind = (children, deepFindFn) => {
  let found;
  Children.toArray(children).find((child) => {
    if (hasComplexChildren(child)) {
      // Find inside the child that has children
      found = deepFind(child.props.children, deepFindFn);
      return typeof found !== 'undefined';
    }
    if (deepFindFn(child)) {
      found = child;
      return true;
    }
    return false;
  });
  return found;
};

export const onlyText = (children) => {
  return Children.toArray(children)
    .reduce(
      (flattened, child) => [
        ...flattened,
        hasChildren(child) ? onlyText(child.props.children) : child,
      ],
      [],
    )
    .join('');
};

export { deepFilter, deepForEach, deepMap, filter };

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
