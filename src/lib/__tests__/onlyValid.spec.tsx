import { shallow } from 'enzyme';
import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import onlyValid from '../onlyValid.js';

interface Props {
  children?: ReactNode;
}

const OnlyValid = ({ children }: Readonly<Props>): ReactElement => <div>{onlyValid(children)}</div>;
const CustomElement = (): ReactElement => <div>I am a react element</div>;

describe('onlyValid', () => {
  it('does not filter all valid html elements', () => {
    const wrapper = shallow(
      <OnlyValid>
        <span>0</span>
        <i>2</i>
      </OnlyValid>,
    );

    expect(wrapper).toContainReact(
      <div>
        <span>0</span>
        <i>2</i>
      </div>,
    );
  });

  it('does not filter all valid html and custom elements', () => {
    const wrapper = shallow(
      <OnlyValid>
        <span>0</span>
        <CustomElement />
        <i>2</i>
      </OnlyValid>,
    );

    expect(wrapper).toContainReact(
      <div>
        <span>0</span>
        <CustomElement />
        <i>2</i>
      </div>,
    );
  });

  it('does not filter nested all valid elements', () => {
    const wrapper = shallow(
      <OnlyValid>
        <span>0</span>
        <i>2</i>
        <span>
          <strong>3</strong>
          <strong>
            <strong>4</strong>
          </strong>
        </span>
      </OnlyValid>,
    );

    expect(wrapper).toContainReact(
      <div>
        <span>0</span>
        <i>2</i>
        <span>
          <strong>3</strong>
          <strong>
            <strong>4</strong>
          </strong>
        </span>
      </div>,
    );
  });

  it('filters non react elements', () => {
    const wrapper = shallow(
      <OnlyValid>
        <span>0</span>
        text
        <i>2</i>
        {null}
        {3}
        {true}
        {false}
        {undefined}
        <b>3</b>
      </OnlyValid>,
    );

    expect(wrapper).toContainReact(
      <div>
        <span>0</span>
        <i>2</i>
        <b>3</b>
      </div>,
    );
  });

  it('filters nested non react elements', () => {
    const wrapper = shallow(
      <OnlyValid>
        <span>0</span>
        text
        <i>2</i>
        <span>
          <strong>3</strong>
          {null}
          {3}
          {true}
          <strong>
            <strong>4</strong>
            {false}
          </strong>
          {undefined}
        </span>
      </OnlyValid>,
    );

    expect(wrapper).toContainReact(
      <div>
        <span>0</span>
        <i>2</i>
        <span>
          <strong>3</strong>
          <strong>
            <strong>4</strong>
          </strong>
        </span>
      </div>,
    );
  });

  it('works on empty', () => {
    const wrapper = shallow(<OnlyValid />);

    expect(wrapper).toContainReact(<div />);
  });

  it('can filter all elements', () => {
    const wrapper = shallow(
      <OnlyValid>
        text
        {null}
        {3}
        {true}
        {false}
        {undefined}
      </OnlyValid>,
    );

    expect(wrapper).toContainReact(<div />);
  });
});
