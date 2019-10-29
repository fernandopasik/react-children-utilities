import React, { ReactElement, ReactNode } from 'react';
import { shallow } from 'enzyme';

import groupByType from '../groupByType';

interface Props {
  children?: ReactNode;
}

describe('groupByType', () => {
  describe('returns empty object', () => {
    it('on empty children', () => {
      let elements;

      const Grouped = ({ children }: Props): ReactElement => {
        elements = groupByType(children, ['span', 'i']);
        return <div>{children}</div>;
      };

      shallow(<Grouped />);

      expect(elements).toStrictEqual({});
    });

    it('on boolean children', () => {
      let elements;

      const Grouped = ({ children }: Props): ReactElement => {
        elements = groupByType(children, ['span', 'i']);
        return <div>{children}</div>;
      };

      shallow(
        <Grouped>
          {false}
          {true}
        </Grouped>,
      );

      expect(elements).toStrictEqual({});
    });

    it('on null children', () => {
      let elements;

      const Grouped = ({ children }: Props): ReactElement => {
        elements = groupByType(children, ['span', 'i']);
        return <div>{children}</div>;
      };

      shallow(<Grouped>{null}</Grouped>);

      expect(elements).toStrictEqual({});
    });
  });

  describe('returns on rest', () => {
    it('on non matched element types', () => {
      let elements;

      const Grouped = ({ children }: Props): ReactElement => {
        elements = groupByType(children, ['span']);
        return <div>{children}</div>;
      };

      shallow(
        <Grouped>
          <span>1</span>
          <b>2</b>
          <i>3</i>
        </Grouped>,
      );

      const [first, second] = elements.rest;

      expect(first.type).toBe('b');
      expect(first.props.children).toBe('2');
      expect(second.type).toBe('i');
      expect(second.props.children).toBe('3');
    });

    it('on text children', () => {
      let elements;

      const Grouped = ({ children }: Props): ReactElement => {
        elements = groupByType(children, ['span']);
        return <div>{children}</div>;
      };

      shallow(<Grouped>example with some words</Grouped>);

      expect(elements).toStrictEqual({ rest: ['example with some words'] });
    });

    it('on number children', () => {
      let elements;

      const Grouped = ({ children }: Props): ReactElement => {
        elements = groupByType(children, ['span']);
        return <div>{children}</div>;
      };

      shallow(
        <Grouped>
          {1}
          {2}
        </Grouped>,
      );

      expect(elements).toStrictEqual({ rest: [1, 2] });
    });

    it('on mixed non element children', () => {
      let elements;

      const Grouped = ({ children }: Props): ReactElement => {
        elements = groupByType(children, ['span']);
        return <div>{children}</div>;
      };

      shallow(
        <Grouped>
          {true}
          example
          {null}
          with some words
          {3}
        </Grouped>,
      );

      expect(elements).toStrictEqual({ rest: ['example', 'with some words', 3] });
    });
  });
});
