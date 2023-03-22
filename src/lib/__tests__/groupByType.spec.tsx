import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import groupByType from '../groupByType.js';

describe('groupByType', () => {
  it('groups elements with same tagName', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', 'strong']);
      return <div>{children}</div>;
    };

    TestRenderer.create(
      <Grouped>
        <span>
          <b>1</b>
        </span>
        <span>2</span>
        <strong>3</strong>
      </Grouped>,
    );

    const [first, second] = elements.span as ReactElement[];
    expect(TestRenderer.create(first).toJSON()).toMatchInlineSnapshot(`
      <span>
        <b>
          1
        </b>
      </span>
    `);
    expect(TestRenderer.create(second).toJSON()).toMatchInlineSnapshot(`
      <span>
        2
      </span>
    `);

    const [third] = elements.strong as ReactElement[];
    expect(TestRenderer.create(third).toJSON()).toMatchInlineSnapshot(`
      <strong>
        3
      </strong>
    `);
  });

  it('can group react elements by name', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Example: FC<PropsWithChildren> = ({ children }) => <div>{children}</div>;
    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', 'Example']);
      return <div>{children}</div>;
    };

    TestRenderer.create(
      <Grouped>
        <span>1</span>
        <Example>2</Example>
        <span>3</span>
        <Example>4</Example>
      </Grouped>,
    );

    expect(elements.span).toHaveLength(2);
    expect(elements.Example).toHaveLength(2);
    expect(elements.rest).toBeUndefined();
  });

  it('can group react elements by component function', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Example: FC<PropsWithChildren> = ({ children }) => <div>{children}</div>;
    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', Example]);
      return <div>{children}</div>;
    };

    TestRenderer.create(
      <Grouped>
        <span>1</span>
        <Example>2</Example>
        <span>3</span>
        <Example>4</Example>
      </Grouped>,
    );

    expect(elements.span).toHaveLength(2);
    expect(elements.Example).toHaveLength(2);
    expect(elements.rest).toBeUndefined();
  });

  it('can group react elements by component class', () => {
    let elements: Record<string, ReactNode[]> = {};

    // eslint-disable-next-line react/prefer-stateless-function
    class Example extends React.Component<{ children: ReactNode }> {
      public render(): ReactElement {
        const { children } = this.props;
        return <div>{children}</div>;
      }
    }

    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', Example]);
      return <div>{children}</div>;
    };

    TestRenderer.create(
      <Grouped>
        <span>1</span>
        <Example>2</Example>
        <span>3</span>
        <Example>4</Example>
      </Grouped>,
    );

    expect(elements.span).toHaveLength(2);
    expect(elements.Example).toHaveLength(2);
    expect(elements.rest).toBeUndefined();
  });

  it('groups the non matching types in rest', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', 'strong']);
      return <div>{children}</div>;
    };

    TestRenderer.create(
      <Grouped>
        <span>
          <b>1</b>
        </span>
        <span>2</span>
        <b>3</b>
        <i>4</i>
      </Grouped>,
    );

    const [first, second] = elements.rest as ReactElement[];
    expect(TestRenderer.create(first).toJSON()).toMatchInlineSnapshot(`
      <b>
        3
      </b>
    `);
    expect(TestRenderer.create(second).toJSON()).toMatchInlineSnapshot(`
      <i>
        4
      </i>
    `);
  });

  it('groups the non matching types in rest with a different key name', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', 'strong'], 'others');
      return <div>{children}</div>;
    };

    TestRenderer.create(
      <Grouped>
        <span>2</span>
        <b>3</b>
      </Grouped>,
    );

    const [first] = elements.others as ReactElement[];
    expect(TestRenderer.create(first).toJSON()).toMatchInlineSnapshot(`
      <b>
        3
      </b>
    `);
  });

  it('if no types provided groups everything on rest', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children);
      return <div>{children}</div>;
    };

    TestRenderer.create(
      <Grouped>
        <span>2</span>
        <b>3</b>
      </Grouped>,
    );

    const [first, second] = elements.rest as ReactElement[];
    expect(TestRenderer.create(first).toJSON()).toMatchInlineSnapshot(`
      <span>
        2
      </span>
    `);
    expect(TestRenderer.create(second).toJSON()).toMatchInlineSnapshot(`
      <b>
        3
      </b>
    `);
  });

  describe('returns empty object', () => {
    it('on empty children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span', 'i']);
        return <div>{children}</div>;
      };

      TestRenderer.create(<Grouped />);

      expect(elements).toStrictEqual({});
    });

    it('on boolean children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span', 'i']);
        return <div>{children}</div>;
      };

      TestRenderer.create(
        <Grouped>
          {false}
          {true}
        </Grouped>,
      );

      expect(elements).toStrictEqual({});
    });

    it('on null children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span', 'i']);
        return <div>{children}</div>;
      };

      TestRenderer.create(<Grouped>{null}</Grouped>);

      expect(elements).toStrictEqual({});
    });
  });

  describe('returns on rest', () => {
    it('on text children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span']);
        return <div>{children}</div>;
      };

      TestRenderer.create(<Grouped>example with some words</Grouped>);

      expect(elements).toStrictEqual({ rest: ['example with some words'] });
    });

    it('on number children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span']);
        return <div>{children}</div>;
      };

      TestRenderer.create(
        <Grouped>
          {1}
          {2}
        </Grouped>,
      );

      expect(elements).toStrictEqual({ rest: [1, 2] });
    });

    it('on mixed non element children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Example: FC<PropsWithChildren> = () => <div />;

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span']);
        return <div>{children}</div>;
      };

      TestRenderer.create(
        <Grouped>
          {true}
          example
          {null}
          with some words
          {3}
          <Example />
        </Grouped>,
      );

      expect(elements).toMatchInlineSnapshot(`
        {
          "rest": [
            "example",
            "with some words",
            3,
            <Example />,
          ],
        }
      `);
    });
  });
});
