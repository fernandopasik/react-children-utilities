import React, { cloneElement } from 'react';
import { shallow } from 'enzyme';

import deepMap from '../deepMap';

describe('deepMap', () => {
  it('maps', () => {
    const DeepMapped = ({ children }) => (
      <div>
        {deepMap(children, (child) => {
          if (child && child.type === 'b') {
            return cloneElement(child, { ...child.props, className: 'mapped' });
          }
          return child;
        })}
      </div>
    );

    const wrapper = shallow(
      <DeepMapped>
        <b>1</b>
        <b>2</b>
        <span>
          <b>3</b>
        </span>
        <div>
          <div>
            <b>4</b>
          </div>
        </div>
        {null && <div>will not show up</div>}
        {false && <div>will not show up</div>}
        {undefined && <div>will not show up</div>}
      </DeepMapped>,
    );
    expect(wrapper.find('.mapped')).toExist();
    expect(wrapper.find('.mapped')).toHaveLength(4);
  });
});
