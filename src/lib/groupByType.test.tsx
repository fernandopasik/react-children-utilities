import 'global-jsdom/register';

import { cleanup, render, screen } from '@testing-library/react';
import assert from 'node:assert';
import { describe, it } from 'node:test';
import React, { type FC, type PropsWithChildren, type ReactElement, type ReactNode } from 'react';
import groupByType from './groupByType.ts';

describe('groupByType', () => {
  it('groups elements with same tagName', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', 'strong']);
      return <div data-testid="grouped">{children}</div>;
    };

    render(
      <Grouped>
        <span>
          <b>1</b>
        </span>
        <span>2</span>
        <strong>3</strong>
      </Grouped>,
    );

    cleanup();
    render(elements['span']);

    assert.notEqual(screen.queryByText(1), null);
    assert.notEqual(screen.queryByText(2), null);
    assert.equal(screen.queryByText(3), null);

    cleanup();
    render(elements['strong']);

    assert.equal(screen.queryByText(1), null);
    assert.equal(screen.queryByText(2), null);
    assert.notEqual(screen.queryByText(3), null);
  });

  it('can group react elements by name', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Example: FC<PropsWithChildren> = ({ children }) => <div>{children}</div>;
    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', 'Example']);
      return <div>{children}</div>;
    };

    render(
      <Grouped>
        <span>1</span>
        <Example>2</Example>
        <span>3</span>
        <Example>4</Example>
      </Grouped>,
    );

    assert.equal(elements['span']?.length, 2);
    assert.equal(elements['Example']?.length, 2);
    assert.equal(elements['rest'], undefined);
  });

  it('can group react elements by component function', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Example: FC<PropsWithChildren> = ({ children }) => <div>{children}</div>;
    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', Example]);
      return <div>{children}</div>;
    };

    render(
      <Grouped>
        <span>1</span>
        <Example>2</Example>
        <span>3</span>
        <Example>4</Example>
      </Grouped>,
    );

    assert.equal(elements['span']?.length, 2);
    assert.equal(elements['Example']?.length, 2);
    assert.equal(elements['rest'], undefined);
  });

  it('can group react elements by component class', () => {
    let elements: Record<string, ReactNode[]> = {};

    class Example extends React.Component<{ children: ReactNode }> {
      public override render(): ReactElement {
        const { children } = this.props;
        return <div>{children}</div>;
      }
    }

    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', Example]);
      return <div>{children}</div>;
    };

    render(
      <Grouped>
        <span>1</span>
        <Example>2</Example>
        <span>3</span>
        <Example>4</Example>
      </Grouped>,
    );

    assert.equal(elements['span']?.length, 2);
    assert.equal(elements['Example']?.length, 2);
    assert.equal(elements['rest'], undefined);
  });

  it('groups the non matching types in rest', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', 'strong']);
      return <div>{children}</div>;
    };

    render(
      <Grouped>
        <span>
          <b>1</b>
        </span>
        <span>2</span>
        <b>3</b>
        <i>4</i>
      </Grouped>,
    );

    cleanup();
    render(elements['rest']);

    assert.equal(screen.queryByText(1), null);
    assert.equal(screen.queryByText(2), null);
    assert.notEqual(screen.queryByText(3), null);
    assert.notEqual(screen.queryByText(4), null);
  });

  it('groups the non matching types in rest with a different key name', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', 'strong'], 'others');
      return <div>{children}</div>;
    };

    render(
      <Grouped>
        <span>2</span>
        <b>3</b>
      </Grouped>,
    );

    cleanup();
    render(elements['others']);

    assert.equal(screen.queryByText(2), null);
    assert.notEqual(screen.queryByText(3), null);
  });

  it('if no types provided groups everything on rest', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children);
      return <div>{children}</div>;
    };

    render(
      <Grouped>
        <span>2</span>
        <b>3</b>
      </Grouped>,
    );

    cleanup();
    render(elements['rest']);

    assert.notEqual(screen.queryByText(2), null);
    assert.notEqual(screen.queryByText(3), null);
  });

  it('with just a single element', () => {
    let elements: Record<string, ReactNode[]> = {};

    const Grouped: FC<PropsWithChildren> = ({ children }) => {
      elements = groupByType(children, ['span', 'strong']);
      return <div data-testid="grouped">{children}</div>;
    };

    render(
      <Grouped>
        <span>2</span>
      </Grouped>,
    );

    cleanup();
    render(elements['span']);

    assert.notEqual(screen.queryByText(2), null);
  });

  describe('returns empty object', () => {
    it('on empty children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span', 'i']);
        return <div>{children}</div>;
      };

      render(<Grouped />);

      assert.deepEqual(elements, {});
    });

    it('on boolean children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span', 'i']);
        return <div>{children}</div>;
      };

      render(
        <Grouped>
          {false}
          {true}
        </Grouped>,
      );

      assert.deepEqual(elements, {});
    });

    it('on null children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span', 'i']);
        return <div>{children}</div>;
      };

      render(<Grouped>{null}</Grouped>);

      assert.deepEqual(elements, {});
    });
  });

  describe('returns on rest', () => {
    it('on text children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span']);
        return <div>{children}</div>;
      };

      render(<Grouped>example with some words</Grouped>);

      assert.deepEqual(elements, { rest: ['example with some words'] });
    });

    it('on number children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span']);
        return <div>{children}</div>;
      };

      render(
        <Grouped>
          {1}
          {2}
        </Grouped>,
      );

      assert.deepEqual(elements, { rest: [1, 2] });
    });

    it('on mixed non element children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Example: FC<PropsWithChildren> = () => <div data-testid="example" />;

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span']);
        return <div data-testid="grouped">{children}</div>;
      };

      render(
        <Grouped>
          {true}
          example
          {null}
          with some words
          {3}
          <Example />
        </Grouped>,
      );

      cleanup();
      render(elements['rest']);

      assert.notEqual(screen.queryByTestId('example'), null);

      assert.notEqual(screen.queryByText(/example/u), null);
      assert.notEqual(screen.queryByText(/with some words/u), null);
      assert.notEqual(screen.queryByText(/3/u), null);
    });
  });
});
