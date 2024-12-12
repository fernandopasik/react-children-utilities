import { Children } from 'react';
import deepFilter from './lib/deepFilter.ts';
import deepFind from './lib/deepFind.ts';
import deepForEach from './lib/deepForEach.ts';
import deepMap from './lib/deepMap.ts';
import filter from './lib/filter.ts';
import getElementName from './lib/getElementName.ts';
import groupByType from './lib/groupByType.ts';
import hasChildren from './lib/hasChildren.ts';
import hasComplexChildren from './lib/hasComplexChildren.ts';
import onlyText from './lib/onlyText.ts';
import onlyValid from './lib/onlyValid.ts';

export {
  deepFilter,
  deepFind,
  deepForEach,
  deepMap,
  filter,
  getElementName,
  groupByType,
  hasChildren,
  hasComplexChildren,
  onlyText,
  onlyValid,
};

export default {
  ...Children,
  deepFilter,
  deepFind,
  deepForEach,
  deepMap,
  filter,
  getElementName,
  groupByType,
  hasChildren,
  hasComplexChildren,
  onlyText,
  onlyValid,
};
