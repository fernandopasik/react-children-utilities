import { Children } from 'react';

import deepFilter from './deepFilter';
import deepFind from './deepFind';
import deepForEach from './deepForEach';
import deepMap from './deepMap';
import filter from './filter';
import hasChildren from './hasChildren';
import hasComplexChildren from './hasComplexChildren';
import onlyText from './onlyText';

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

export { deepFilter, deepFind, deepForEach, deepMap, filter, onlyText };

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
