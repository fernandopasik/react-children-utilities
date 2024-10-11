import { describe, it } from '@jest/globals';
import { cleanup, render, screen } from '@testing-library/react';
import React, { type FC, type PropsWithChildren, type ReactElement, type ReactNode } from 'react';
import groupByType from './groupByType.js';

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
    render(elements.span);

    expect(screen.queryByText(1)).not.toBeNull();
    expect(screen.queryByText(2)).not.toBeNull();
    expect(screen.queryByText(3)).toBeNull();

    cleanup();
    render(elements.strong);

    expect(screen.queryByText(1)).toBeNull();
    expect(screen.queryByText(2)).toBeNull();
    expect(screen.queryByText(3)).not.toBeNull();
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

    render(
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

    render(
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
    render(elements.rest);

    expect(screen.queryByText(1)).toBeNull();
    expect(screen.queryByText(2)).toBeNull();
    expect(screen.queryByText(3)).not.toBeNull();
    expect(screen.queryByText(4)).not.toBeNull();
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
    render(elements.others);

    expect(screen.queryByText(2)).toBeNull();
    expect(screen.queryByText(3)).not.toBeNull();
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
    render(elements.rest);

    expect(screen.queryByText(2)).not.toBeNull();
    expect(screen.queryByText(3)).not.toBeNull();
  });

  describe('returns empty object', () => {
    it('on empty children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span', 'i']);
        return <div>{children}</div>;
      };

      render(<Grouped />);

      expect(elements).toStrictEqual({});
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

      expect(elements).toStrictEqual({});
    });

    it('on null children', () => {
      let elements: Record<string, ReactNode[]> = {};

      const Grouped: FC<PropsWithChildren> = ({ children }) => {
        elements = groupByType(children, ['span', 'i']);
        return <div>{children}</div>;
      };

      render(<Grouped>{null}</Grouped>);

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

      render(<Grouped>example with some words</Grouped>);

      expect(elements).toStrictEqual({ rest: ['example with some words'] });
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

      expect(elements).toStrictEqual({ rest: [1, 2] });
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
      render(elements.rest);

      expect(screen.queryByTestId('example')).not.toBeNull();

      expect(screen.queryByText(/example/u)).not.toBeNull();
      expect(screen.queryByText(/with some words/u)).not.toBeNull();
      expect(screen.queryByText(/3/u)).not.toBeNull();
    });
  });
});
