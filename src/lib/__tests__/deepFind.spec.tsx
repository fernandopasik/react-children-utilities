import { describe, expect, it } from '@jest/globals';
import React, { type FC, type PropsWithChildren, type ReactElement, type ReactNode } from 'react';
import TestRenderer, { type ReactTestRendererJSON } from 'react-test-renderer';
import deepFind from '../deepFind.js';

describe('deepFind', () => {
  it('a nested element', () => {
    const DeepFound: FC<PropsWithChildren> = ({ children = [] }) => (
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
    const DeepFound: FC<PropsWithChildren> = ({ children }) => (
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
    const DeepFound: FC<PropsWithChildren> = ({ children }) => (
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
    const DeepFound: FC<PropsWithChildren> = ({ children }) => (
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
