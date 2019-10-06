import { Children } from 'react';

import deepFilter from './deepFilter';
import deepFind from './deepFind';
import deepForEach from './deepForEach';
import deepMap from './deepMap';
import filter from './filter';
import groupByType from './groupByType';
import hasChildren from './hasChildren';
import hasComplexChildren from './hasComplexChildren';
import onlyText from './onlyText';

export {
  deepFilter,
  deepFind,
  deepForEach,
  deepMap,
  filter,
  groupByType,
  hasChildren,
  hasComplexChildren,
  onlyText,
};

export default {
  ...Children,
  deepFilter,
  deepFind,
  deepForEach,
  deepMap,
  filter,
  groupByType,
  hasChildren,
  hasComplexChildren,
  onlyText,
};
