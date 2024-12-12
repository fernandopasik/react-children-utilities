/* eslint-disable import/no-named-as-default-member */
import 'global-jsdom/register';

import assert from 'node:assert';
import { describe, it } from 'node:test';
import Children, {
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
} from './react-children-utilities.ts';

describe('children', () => {
  it('has the right exports', () => {
    assert.ok(filter instanceof Function);
    assert.strictEqual(Children.filter, filter);

    assert.ok(deepFilter instanceof Function);
    assert.strictEqual(Children.deepFilter, deepFilter);

    assert.ok(deepFind instanceof Function);
    assert.strictEqual(Children.deepFind, deepFind);

    assert.ok(deepForEach instanceof Function);
    assert.strictEqual(Children.deepForEach, deepForEach);

    assert.ok(deepMap instanceof Function);
    assert.strictEqual(Children.deepMap, deepMap);

    assert.ok(getElementName instanceof Function);
    assert.strictEqual(Children.getElementName, getElementName);

    assert.ok(groupByType instanceof Function);
    assert.strictEqual(Children.groupByType, groupByType);

    assert.ok(hasChildren instanceof Function);
    assert.strictEqual(Children.hasChildren, hasChildren);

    assert.ok(hasComplexChildren instanceof Function);
    assert.strictEqual(Children.hasComplexChildren, hasComplexChildren);

    assert.ok(onlyText instanceof Function);
    assert.strictEqual(Children.onlyText, onlyText);

    assert.ok(onlyValid instanceof Function);
    assert.strictEqual(Children.onlyValid, onlyValid);
  });
});
