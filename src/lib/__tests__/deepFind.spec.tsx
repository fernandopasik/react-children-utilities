import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import type { ReactTestRendererJSON } from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
import deepFind from '../deepFind.js';

interface Props {
  children?: ReactNode;
}

describe('deepFind', () => {
  it('a nested element', () => {
    const DeepFound = ({ children }: Readonly<Props>): ReactElement => (
      <div>{deepFind(children, (child: ReactNode) => (child as ReactElement).type === 'i')}</div>
    );

    const element = TestRenderer.create(
      <DeepFound>
        <b>1</b>
        <span>
          <i>2</i>
        </span>
        <i>3</i>
      </DeepFound>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toHaveLength(1);
    expect(children?.[0]).toMatchInlineSnapshot(`
      <i>
        2
      </i>
    `);
  });

  it('a matching element with matching nested elements', () => {
    const DeepFound = ({ children }: Readonly<Props>): ReactElement => (
      <div>{deepFind(children, (child: ReactNode) => (child as ReactElement).type === 'i')}</div>
    );

    const element = TestRenderer.create(
      <DeepFound>
        <b>1</b>
        <i>
          <i>2</i>
        </i>
        <i>3</i>
      </DeepFound>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toHaveLength(1);
    expect(children?.[0]).toMatchInlineSnapshot(`
      <i>
        <i>
          2
        </i>
      </i>
    `);
  });

  it('a non nested element', () => {
    const DeepFound = ({ children }: Readonly<Props>): ReactElement => (
      <div>{deepFind(children, (child: ReactNode) => (child as ReactElement).type === 'i')}</div>
    );

    const element = TestRenderer.create(
      <DeepFound>
        <b>1</b>
        <i>3</i>
      </DeepFound>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toHaveLength(1);
    expect(children?.[0]).toMatchInlineSnapshot(`
      <i>
        3
      </i>
    `);
  });

  it('can not find anything', () => {
    const DeepFound = ({ children }: Readonly<Props>): ReactElement => (
      <div>{deepFind(children, (child: ReactNode) => (child as ReactElement).type === 'i')}</div>
    );

    const element = TestRenderer.create(
      <DeepFound>
        <b>1</b>
        <b>2</b>
      </DeepFound>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toBeNull();
    expect(element).toMatchInlineSnapshot(`<div />`);
  });
});
