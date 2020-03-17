import React, { isValidElement, ReactElement, ReactNode } from 'react';
import { shallow } from 'enzyme';

import deepForEach from '../deepForEach';

interface Props {
  children?: ReactNode;
}

describe('deepForEach', () => {
  it('on nested elements', () => {
    const DeepForEached = ({ children }: Props): ReactElement => {
      const items: ReactNode[] = [];
      deepForEach(children, (child: ReactNode) => {
        if (isValidElement(child) && child.type === 'b') {
          items.push((child as ReactElement<{ children: ReactNode[] }>).props.children);
        }
      });
      return <div>{items}</div>;
    };

    const wrapper = shallow(
      <DeepForEached>
        <b>1</b>
        <b>2</b>
        <span>
          <b>3</b>
        </span>
        <i>non matching</i>
        <div>
          <div>
            <b>4</b>
          </div>
        </div>
        example
      </DeepForEached>,
    );

    expect(wrapper).toHaveText('1234');
  });

  it('on non nested elements', () => {
    const DeepForEached = ({ children }: Props): ReactElement => {
      const items: ReactNode[] = [];
      deepForEach(children, (child: ReactNode) => {
        if (isValidElement<{ children?: ReactNode[] }>(child) && child.type === 'b') {
          items.push(child.props.children);
        }
      });
      return <div>{items}</div>;
    };

    const wrapper = shallow(
      <DeepForEached>
        <b>1</b>
        <b>2</b>
      </DeepForEached>,
    );

    expect(wrapper).toHaveText('12');
  });

  it('on empty', () => {
    const DeepForEached = ({ children }: Props): ReactElement => {
      const items: ReactNode[] = [];
      deepForEach(children, (child: ReactNode) => {
        if (isValidElement<{ children?: ReactNode[] }>(child) && child.type === 'b') {
          items.push(child.props.children);
        }
      });
      return <div>{items}</div>;
    };

    const wrapper = shallow(<DeepForEached />);

    expect(wrapper).toHaveText('');
  });
});
