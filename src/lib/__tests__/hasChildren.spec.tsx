import React, { ReactElement, ReactNode } from 'react';
import { shallow } from 'enzyme';

import hasChildren from '../hasChildren';

interface Props {
  children?: ReactNode;
}

describe('hasChildren', () => {
  describe('returns true', () => {
    it('with elements', () => {
      const Test = ({ children }: Readonly<Props>): ReactElement => <div>{children}</div>;

      const wrapper = shallow(
        <Test>
          <span />
          <span />
        </Test>,
      );

      expect(hasChildren(wrapper.getElement())).toBe(true);
    });

    it('with text', () => {
      const Test = ({ children }: Readonly<Props>): ReactElement => <div>{children}</div>;

      const wrapper = shallow(<Test>My test</Test>);

      expect(hasChildren(wrapper.getElement())).toBe(true);
    });

    it('with numbers', () => {
      const Test = ({ children }: Readonly<Props>): ReactElement => <div>{children}</div>;

      const wrapper = shallow(<Test>{1}</Test>);

      expect(hasChildren(wrapper.getElement())).toBe(true);
    });

    it('with true', () => {
      const Test = ({ children }: Readonly<Props>): ReactElement => <div>{children}</div>;

      const wrapper = shallow(<Test>{true}</Test>);

      expect(hasChildren(wrapper.getElement())).toBe(true);
    });

    it('with combined types', () => {
      const Test = ({ children }: Readonly<Props>): ReactElement => <div>{children}</div>;

      const wrapper = shallow(
        <Test>
          <span />
          My test
          {1}
        </Test>,
      );

      expect(hasChildren(wrapper.getElement())).toBe(true);
    });

    it('with valid and non valid types', () => {
      const Test = ({ children }: Readonly<Props>): ReactElement => <div>{children}</div>;

      const wrapper = shallow(
        <Test>
          <span />
          My test
          {null}
          {false}
        </Test>,
      );

      expect(hasChildren(wrapper.getElement())).toBe(true);
    });
  });

  describe('returns false', () => {
    it('when empty', () => {
      const Test = ({ children }: Readonly<Props>): ReactElement => <div>{children}</div>;

      const wrapper = shallow(<Test />);

      expect(hasChildren(wrapper.getElement())).toBe(false);
    });

    it('with null', () => {
      const Test = ({ children }: Readonly<Props>): ReactElement => <div>{children}</div>;

      const wrapper = shallow(<Test>{null}</Test>);

      expect(hasChildren(wrapper.getElement())).toBe(false);
    });

    it('with false', () => {
      const Test = ({ children }: Readonly<Props>): ReactElement => <div>{children}</div>;

      const wrapper = shallow(<Test>{null}</Test>);

      expect(hasChildren(wrapper.getElement())).toBe(false);
    });
  });
});
