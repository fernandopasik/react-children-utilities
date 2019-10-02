import React from 'react';
import { shallow } from 'enzyme';

import groupByType from '../groupByType';

describe('groupByType', () => {
  it('groups', () => {
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
});
