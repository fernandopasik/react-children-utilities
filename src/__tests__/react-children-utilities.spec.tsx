/* eslint-disable import/no-named-as-default-member */

import Children, {
  deepFilter,
  deepFind,
  deepForEach,
  deepMap,
  filter,
  groupByType,
  onlyText,
  onlyValid,
} from '../react-children-utilities';

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

    expect(groupByType).toBeInstanceOf(Function);
    expect(Children.groupByType).toStrictEqual(groupByType);

    expect(onlyText).toBeInstanceOf(Function);
    expect(Children.onlyText).toStrictEqual(onlyText);

    expect(onlyValid).toBeInstanceOf(Function);
    expect(Children.onlyValid).toStrictEqual(onlyValid);
  });
});
