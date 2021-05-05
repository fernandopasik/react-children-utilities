import { shallow } from 'enzyme';
import type { ReactElement, ReactNode } from 'react';
import React, { cloneElement, isValidElement } from 'react';
import deepMap from '../deepMap.js';

interface Props {
  children?: ReactNode;
}

const DeepMapped = ({ children }: Readonly<Props>): ReactElement => (
  <div>
    {deepMap(children, (child: ReactNode) => {
      if (isValidElement<{ className: string }>(child) && child.type === 'b') {
        return cloneElement(child, {
          ...child.props,
          className: 'mapped',
        });
      }
      return child;
    })}
  </div>
);

describe('deepMap', () => {
  it('nested elements', () => {
    const wrapper = shallow(
      <DeepMapped>
        <b>1</b>
        <b>2</b>
        test text
        <span>
          <b>3</b>
        </span>
        <div>
          <b>
            <b>4</b>
          </b>
        </div>
      </DeepMapped>,
    );

    expect(wrapper.find('b.mapped')).toHaveLength(5);
    expect(wrapper.find('b:not(.mapped)')).toHaveLength(0);
  });

  it('non nested elements', () => {
    const wrapper = shallow(
      <DeepMapped>
        <b>1</b>
        <b>2</b>
      </DeepMapped>,
    );

    expect(wrapper.find('b.mapped')).toHaveLength(2);
    expect(wrapper.find('b:not(.mapped)')).toHaveLength(0);
  });

  it('empty children', () => {
    const wrapper = shallow(<DeepMapped />);

    expect(wrapper.children()).toHaveLength(0);
  });
});
