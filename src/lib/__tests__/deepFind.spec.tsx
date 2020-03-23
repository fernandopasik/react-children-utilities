import React, { ReactNode, ReactElement } from 'react';
import { shallow } from 'enzyme';

import deepFind from '../deepFind';

interface Props {
  children?: ReactNode;
}

describe('deepFind', () => {
  it('a nested element', () => {
    const DeepFound = ({ children }: Readonly<Props>): ReactElement => (
      <div>{deepFind(children, (child: ReactNode) => (child as ReactElement).type === 'i')}</div>
    );

    const wrapper = shallow(
      <DeepFound>
        <b>1</b>
        <span>
          <i>2</i>
        </span>
        <i>3</i>
      </DeepFound>,
    );

    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.children().at(0)).toMatchElement(<i>2</i>);
  });

  it('a matching element with matching nested elements', () => {
    const DeepFound = ({ children }: Readonly<Props>): ReactElement => (
      <div>{deepFind(children, (child: ReactNode) => (child as ReactElement).type === 'i')}</div>
    );

    const wrapper = shallow(
      <DeepFound>
        <b>1</b>
        <i>
          <i>2</i>
        </i>
        <i>3</i>
      </DeepFound>,
    );

    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.children().at(0)).toMatchElement(
      <i>
        <i>2</i>
      </i>,
    );
  });

  it('a non nested element', () => {
    const DeepFound = ({ children }: Readonly<Props>): ReactElement => (
      <div>{deepFind(children, (child: ReactNode) => (child as ReactElement).type === 'i')}</div>
    );

    const wrapper = shallow(
      <DeepFound>
        <b>1</b>
        <i>3</i>
      </DeepFound>,
    );

    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.children().at(0)).toMatchElement(<i>3</i>);
  });

  it('can not find anything', () => {
    const DeepFound = ({ children }: Readonly<Props>): ReactElement => (
      <div>{deepFind(children, (child: ReactNode) => (child as ReactElement).type === 'i')}</div>
    );

    const wrapper = shallow(
      <DeepFound>
        <b>1</b>
        <b>2</b>
      </DeepFound>,
    );

    expect(wrapper.children()).toHaveLength(0);
    expect(wrapper).toMatchElement(<div />);
  });
});
