/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { shallow } from 'enzyme';

import Children, {
  deepFilter,
  deepFind,
  deepForEach,
  deepMap,
  filter,
  groupByType,
  onlyText,
} from '..';

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
  });

  it('group by type', () => {
    const Grouped = ({ children }) => (
      <div>
        <div className="spans">{groupByType(children, ['span', 'i'], 'rest').span}</div>
        <div className="rest">{groupByType(children, ['span', 'i'], 'rest').rest}</div>
        <div className="empty">{groupByType(children, ['span', 'i'], 'rest').i}</div>
      </div>
    );

    const wrapper = shallow(
      <Grouped>
        <span>
          <b>1</b>
        </span>
        <span>
          <b>2</b>
        </span>
        <strong>3</strong>
      </Grouped>,
    );
    expect(wrapper.find('.spans b')).toExist();
    expect(wrapper.find('.spans b')).toHaveLength(2);
    expect(wrapper.find('.spans strong')).not.toExist();
    expect(wrapper.find('.rest span')).not.toExist();
    expect(wrapper.find('.rest strong')).toExist();
    expect(wrapper.find('.rest strong')).toHaveLength(1);
    expect(wrapper.find('.empty').children()).not.toExist();
  });

  it('only text', () => {
    const OnlyText = ({ children }) => <div>{onlyText(children)}</div>;

    const wrapper = shallow(
      <OnlyText>
        <span>0</span>
        <b>1</b>
        <span>
          <i>2</i>
        </span>
        <i>3</i>
      </OnlyText>,
    );
    expect(wrapper.find('i')).not.toExist();
    expect(wrapper.find('b')).not.toExist();
    expect(wrapper.find('span')).not.toExist();
    expect(wrapper).toHaveText('0123');
  });
});
