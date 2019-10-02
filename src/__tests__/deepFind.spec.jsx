import React from 'react';
import { shallow } from 'enzyme';

import deepFind from '../deepFind';

describe('deepFind', () => {
  it('finds', () => {
    const DeepFound = ({ children }) => (
      <div>{deepFind(children, (child) => child.type === 'i')}</div>
    );

    const wrapper = shallow(
      <DeepFound>
        <b>1</b>
        <b>2</b>
        <span>
          <i>3</i>
        </span>
        <i>4</i>
        {null && <div>will not show up</div>}
        {false && <div>will not show up</div>}
        {undefined && <div>will not show up</div>}
      </DeepFound>,
    );
    expect(wrapper.find('i')).toExist();
    expect(wrapper.find('i')).toHaveLength(1);
    expect(wrapper.find('span')).not.toExist();
    expect(wrapper).toHaveText('3');
  });
});
