import React from 'react';
import { shallow } from 'enzyme';

import onlyText from '../onlyText';

describe('onlyText', () => {
  it('converts', () => {
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
