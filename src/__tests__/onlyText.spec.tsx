import React, { ReactElement, ReactNode } from 'react';
import { shallow } from 'enzyme';

import onlyText from '../onlyText';

interface Props {
  children?: ReactNode;
}

const OnlyText = ({ children }: Props): ReactElement => <div>{onlyText(children)}</div>;

describe('onlyText', () => {
  it('on nested elements', () => {
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

    expect(wrapper).toHaveText('0123');
  });

  it('on non nested elements', () => {
    const wrapper = shallow(
      <OnlyText>
        <span>0</span>
        <b>1</b>
      </OnlyText>,
    );

    expect(wrapper).toHaveText('01');
  });

  it('on empty', () => {
    const wrapper = shallow(<OnlyText />);

    expect(wrapper).toHaveText('');
  });

  it('on text', () => {
    const wrapper = shallow(<OnlyText>test 1 test 2</OnlyText>);

    expect(wrapper).toHaveText('test 1 test 2');
  });

  it('on number', () => {
    const wrapper = shallow(
      <OnlyText>
        {1}
        {2}
      </OnlyText>,
    );

    expect(wrapper).toHaveText('12');
  });

  it('on true', () => {
    const wrapper = shallow(<OnlyText>{true}</OnlyText>);

    expect(wrapper).toHaveText('');
  });

  it('on false', () => {
    const wrapper = shallow(<OnlyText>{false}</OnlyText>);

    expect(wrapper).toHaveText('');
  });

  it('on null', () => {
    const wrapper = shallow(<OnlyText>{null}</OnlyText>);

    expect(wrapper).toHaveText('');
  });

  it('on combined types', () => {
    const wrapper = shallow(
      <OnlyText>
        example
        {null}
        {3}
        {true}
      </OnlyText>,
    );

    expect(wrapper).toHaveText('example3');
  });
});
