import { shallow } from 'enzyme';
import React, { ReactElement, ReactNode } from 'react';
import deepFilter from '../deepFilter';

interface Props {
  children?: ReactNode;
}

describe('deepFilter', () => {
  it('nested elements', () => {
    const DeepFiltered = ({ children }: Readonly<Props>): ReactElement => (
      <div>{deepFilter(children, (item: ReactNode) => (item as ReactElement).type === 'span')}</div>
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

    expect(wrapper).toContainReact(
      <div>
        <span>1</span>
        <span>2</span>
        <span>
          <span>
            <span>5</span>
          </span>
        </span>
      </div>,
    );
  });

  it('non nested elements', () => {
    const DeepFiltered = ({ children }: Readonly<Props>): ReactElement => (
      <div>{deepFilter(children, (item: ReactNode) => (item as ReactElement).type === 'span')}</div>
    );

    const wrapper = shallow(
      <DeepFiltered>
        <strong>1</strong>
        <span>2</span>
      </DeepFiltered>,
    );

    expect(wrapper).toContainReact(
      <div>
        <span>2</span>
      </div>,
    );
  });

  it('remove elements event if they have matching nested children', () => {
    const DeepFiltered = ({ children }: Readonly<Props>): ReactElement => (
      <div>{deepFilter(children, (item: ReactNode) => (item as ReactElement).type === 'span')}</div>
    );

    const wrapper = shallow(
      <DeepFiltered>
        <span>1</span>
        <span>2</span>
        <span>
          <span>3</span>
          <strong>
            <strong>4</strong>
            <span>5</span>
          </strong>
        </span>
      </DeepFiltered>,
    );

    expect(wrapper).toContainReact(
      <div>
        <span>1</span>
        <span>2</span>
        <span>
          <span>3</span>
        </span>
      </div>,
    );
  });

  it('keeps empty matching elements if children do not match', () => {
    const DeepFiltered = ({ children }: Readonly<Props>): ReactElement => (
      <div>{deepFilter(children, (item: ReactNode) => (item as ReactElement).type === 'span')}</div>
    );

    const wrapper = shallow(
      <DeepFiltered>
        <span>1</span>
        <span>2</span>
        <span>
          <strong>3</strong>
          <strong>
            <strong>4</strong>
            <span>5</span>
          </strong>
        </span>
      </DeepFiltered>,
    );

    expect(wrapper).toContainReact(
      <div>
        <span>1</span>
        <span>2</span>
        <span />
      </div>,
    );
  });
});
