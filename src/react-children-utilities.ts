import { Children } from 'react';
import deepFilter from './lib/deepFilter.js';
import deepFind from './lib/deepFind.js';
import deepForEach from './lib/deepForEach.js';
import deepMap from './lib/deepMap.js';
import filter from './lib/filter.js';
import getElementName from './lib/getElementName.js';
import groupByType from './lib/groupByType.js';
import hasChildren from './lib/hasChildren.js';
import hasComplexChildren from './lib/hasComplexChildren.js';
import onlyText from './lib/onlyText.js';
import onlyValid from './lib/onlyValid.js';

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
