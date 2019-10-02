import React from 'react';
import { shallow } from 'enzyme';

import deepFilter from '../deepFilter';

describe('children', () => {
  it('deep filter', () => {
    const DeepFiltered = ({ children }) => (
      <div>{deepFilter(children, (item) => item.type === 'span')}</div>
    );

    const wrapper = shallow(
      <DeepFiltered>
        <span>1</span>
        <span>2</span>
        <span>
          <strong>3</strong>
          <span>
            <strong>4</strong>
            <span>5</span>
          </span>
        </span>
      </DeepFiltered>,
    );
    expect(wrapper.find('span')).toExist();
    expect(wrapper.find('span')).toHaveLength(5);
    expect(wrapper.find('strong')).not.toExist();
  });
});
