import 'global-jsdom/register';

import { cleanup, render, screen } from '@testing-library/react';
import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';
import React, { type FC, type PropsWithChildren, type ReactElement, type ReactNode } from 'react';
import deepFind from './deepFind.js';

describe('deepFind', () => {
  const DeepFound: FC<PropsWithChildren> = ({ children = [] }) => (
    <div>{deepFind(children, (child: ReactNode) => (child as ReactElement).type === 'i')}</div>
  );

  beforeEach(() => {
    cleanup();
  });

  it('a nested element', () => {
    render(
      <DeepFound>
        <b data-testid="no">1</b>
        <span data-testid="yes">
          <i data-testid="yes">2</i>
        </span>
        <i data-testid="no">3</i>
      </DeepFound>,
    );

    assert.equal(screen.queryByTestId('no'), null);
    assert.equal(screen.queryByText('1'), null);
    assert.equal(screen.queryByText('3'), null);
    assert.equal(screen.queryAllByTestId('yes').length, 1);
    assert.notEqual(screen.queryByText('2'), null);
  });

  it('a matching element with matching nested elements', () => {
    render(
      <DeepFound>
        <b data-testid="no">1</b>
        <i data-testid="yes">
          <i data-testid="yes">2</i>
        </i>
        <i data-testid="no">3</i>
      </DeepFound>,
    );

    assert.equal(screen.queryByTestId('no'), null);
    assert.equal(screen.queryByText('1'), null);
    assert.equal(screen.queryByText('3'), null);
    assert.equal(screen.queryAllByTestId('yes').length, 2);
    assert.notEqual(screen.queryByText('2'), null);
  });

  it('a non nested element', () => {
    render(
      <DeepFound>
        <b data-testid="no">1</b>
        <i data-testid="yes">3</i>
      </DeepFound>,
    );

    assert.equal(screen.queryByTestId('no'), null);
    assert.equal(screen.queryByText('1'), null);
    assert.equal(screen.queryAllByTestId('yes').length, 1);
    assert.notEqual(screen.queryByText('3'), null);
  });

  it('can not find anything', () => {
    render(
      <DeepFound>
        <b data-testid="no">1</b>
        <b data-testid="no">2</b>
      </DeepFound>,
    );

    assert.equal(screen.queryByTestId('no'), null);
    assert.equal(screen.queryByText('1'), null);
    assert.equal(screen.queryByText('2'), null);
  });
});
