import type { FC, ReactElement, ReactNode } from 'react';
import React from 'react';
import type { ReactTestRendererJSON } from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
import deepFilter from '../deepFilter.js';

interface Props {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
}

describe('deepFilter', () => {
  it('nested elements', () => {
    const DeepFiltered: FC<Props> = ({ children }) => (
      <div>{deepFilter(children, (item: ReactNode) => (item as ReactElement).type === 'span')}</div>
    );

    const element = TestRenderer.create(
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
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toMatchInlineSnapshot(`
      Array [
        <span>
          1
        </span>,
        <span>
          2
        </span>,
        <span>
          <span>
            <span>
              5
            </span>
          </span>
        </span>,
      ]
    `);
  });

  it('non nested elements', () => {
    const DeepFiltered: FC<Props> = ({ children }) => (
      <div>{deepFilter(children, (item: ReactNode) => (item as ReactElement).type === 'span')}</div>
    );

    const element = TestRenderer.create(
      <DeepFiltered>
        <strong>1</strong>
        <span>2</span>
      </DeepFiltered>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toMatchInlineSnapshot(`
      Array [
        <span>
          2
        </span>,
      ]
    `);
  });

  it('remove elements event if they have matching nested children', () => {
    const DeepFiltered: FC<Props> = ({ children }) => (
      <div>{deepFilter(children, (item: ReactNode) => (item as ReactElement).type === 'span')}</div>
    );

    const element = TestRenderer.create(
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
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toMatchInlineSnapshot(`
      Array [
        <span>
          1
        </span>,
        <span>
          2
        </span>,
        <span>
          <span>
            3
          </span>
        </span>,
      ]
    `);
  });

  it('keeps empty matching elements if children do not match', () => {
    const DeepFiltered: FC<Props> = ({ children }) => (
      <div>{deepFilter(children, (item: ReactNode) => (item as ReactElement).type === 'span')}</div>
    );

    const element = TestRenderer.create(
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
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toMatchInlineSnapshot(`
      Array [
        <span>
          1
        </span>,
        <span>
          2
        </span>,
        <span />,
      ]
    `);
  });
});
