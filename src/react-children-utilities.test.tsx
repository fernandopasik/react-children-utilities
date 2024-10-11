/* eslint-disable import/no-named-as-default-member */
import { describe, expect, it } from '@jest/globals';
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
} from './react-children-utilities.js';

describe('children', () => {
  it('has the right exports', () => {
    expect(filter).toBeInstanceOf(Function);
    expect(Children.filter).toStrictEqual(filter);

    expect(deepFilter).toBeInstanceOf(Function);
    expect(Children.deepFilter).toStrictEqual(deepFilter);

    expect(deepFind).toBeInstanceOf(Function);
    expect(Children.deepFind).toStrictEqual(deepFind);

    expect(deepForEach).toBeInstanceOf(Function);
    expect(Children.deepForEach).toStrictEqual(deepForEach);

    expect(deepMap).toBeInstanceOf(Function);
    expect(Children.deepMap).toStrictEqual(deepMap);

    expect(getElementName).toBeInstanceOf(Function);
    expect(Children.getElementName).toStrictEqual(getElementName);

    expect(groupByType).toBeInstanceOf(Function);
    expect(Children.groupByType).toStrictEqual(groupByType);

    expect(hasChildren).toBeInstanceOf(Function);
    expect(Children.hasChildren).toStrictEqual(hasChildren);

    expect(hasComplexChildren).toBeInstanceOf(Function);
    expect(Children.hasComplexChildren).toStrictEqual(hasComplexChildren);

    expect(onlyText).toBeInstanceOf(Function);
    expect(Children.onlyText).toStrictEqual(onlyText);

    expect(onlyValid).toBeInstanceOf(Function);
    expect(Children.onlyValid).toStrictEqual(onlyValid);
  });
});
