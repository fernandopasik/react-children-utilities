import 'global-jsdom/register';

import { cleanup, render, screen } from '@testing-library/react';
import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';
import React, { type FC, type PropsWithChildren, isValidElement } from 'react';
import deepFilter from './deepFilter.js';

describe('deepFilter', () => {
  const DeepFiltered: FC<PropsWithChildren> = ({ children }) => (
    <div data-testid="filtered">
      {deepFilter(children, (item) => isValidElement(item) && item.type === 'span')}
    </div>
  );

  beforeEach(() => {
    cleanup();
  });

  it('nested elements', () => {
    render(
      <DeepFiltered>
        <span data-testid="yes">1</span>
        <span data-testid="yes">2</span>
        <span data-testid="yes">
          <strong data-testid="no">3</strong>
          <span data-testid="yes">
            <strong data-testid="no">4</strong>
            <span data-testid="yes">5</span>
          </span>
        </span>
      </DeepFiltered>,
    );

    assert.equal(screen.queryByTestId('no'), null);
    assert.equal(screen.queryByText('3'), null);
    assert.equal(screen.queryByText('4'), null);
    assert.equal(screen.queryAllByTestId('yes').length, 5);
    assert.notEqual(screen.queryByText('1'), null);
    assert.notEqual(screen.queryByText('2'), null);
    assert.notEqual(screen.queryByText('5'), null);
  });

  it('non nested elements', () => {
    render(
      <DeepFiltered>
        <strong data-testid="no">1</strong>
        <span data-testid="yes">2</span>
      </DeepFiltered>,
    );

    assert.equal(screen.queryByTestId('no'), null);
    assert.equal(screen.queryByText('1'), null);
    assert.equal(screen.queryAllByTestId('yes').length, 1);
    assert.notEqual(screen.queryByText('2'), null);
  });

  it('remove elements event if they have matching nested children', () => {
    render(
      <DeepFiltered>
        <span data-testid="yes">1</span>
        <span data-testid="yes">2</span>
        <span data-testid="yes">
          <span data-testid="yes">3</span>
          <strong data-testid="no">
            <strong data-testid="no">4</strong>
            <span data-testid="no">5</span>
          </strong>
        </span>
      </DeepFiltered>,
    );

    assert.equal(screen.queryByTestId('no'), null);
    assert.equal(screen.queryByText('4'), null);
    assert.equal(screen.queryByText('5'), null);
    assert.equal(screen.queryAllByTestId('yes').length, 4);
    assert.notEqual(screen.queryByText('1'), null);
    assert.notEqual(screen.queryByText('2'), null);
    assert.notEqual(screen.queryByText('3'), null);
  });

  it('keeps empty matching elements if children do not match', () => {
    render(
      <DeepFiltered>
        <span data-testid="yes">1</span>
        <span data-testid="yes">2</span>
        <span data-testid="yes">
          <strong data-testid="no">3</strong>
          <strong data-testid="no">
            <strong data-testid="no">4</strong>
            <span data-testid="no">5</span>
          </strong>
        </span>
      </DeepFiltered>,
    );

    assert.equal(screen.queryByTestId('no'), null);
    assert.equal(screen.queryByText('3'), null);
    assert.equal(screen.queryByText('4'), null);
    assert.equal(screen.queryByText('5'), null);
    assert.equal(screen.queryAllByTestId('yes').length, 3);
    assert.notEqual(screen.queryByText('1'), null);
    assert.notEqual(screen.queryByText('2'), null);
  });

  it('can handle empty children', async () => {
    render(<DeepFiltered />);

    const { textContent } = await screen.findByTestId('filtered');
    assert.equal(textContent, '');
  });
});
