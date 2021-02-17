import { Children } from 'react';
import deepFilter from './lib/deepFilter';
import deepFind from './lib/deepFind';
import deepForEach from './lib/deepForEach';
import deepMap from './lib/deepMap';
import filter from './lib/filter';
import groupByType from './lib/groupByType';
import hasChildren from './lib/hasChildren';
import hasComplexChildren from './lib/hasComplexChildren';
import onlyText from './lib/onlyText';
import onlyValid from './lib/onlyValid';

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
  onlyValid,
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
  onlyValid,
};
