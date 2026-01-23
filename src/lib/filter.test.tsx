import 'global-jsdom/register';

import { cleanup, render, screen } from '@testing-library/react';
import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';
import React, { isValidElement, type FC, type PropsWithChildren, type ReactNode } from 'react';
import filter from './filter.ts';

describe('filter', () => {
  const Filtered: FC<PropsWithChildren> = ({ children }) => (
    <div data-testid="filtered">
      {filter(children, (item: ReactNode) => isValidElement(item) && item.type === 'span')}
    </div>
  );

  beforeEach(() => {
    cleanup();
  });

  it('returns same children', () => {
    render(
      <Filtered>
        <span data-testid="yes">1</span>
        <span data-testid="yes">2</span>
        <span data-testid="yes">3</span>
      </Filtered>,
    );

    assert.equal(screen.queryAllByTestId('yes').length, 3);
    assert.notEqual(screen.queryByText('1'), null);
    assert.notEqual(screen.queryByText('2'), null);
    assert.notEqual(screen.queryByText('3'), null);
  });

  it('returns only matching children', () => {
    render(
      <Filtered>
        <span data-testid="yes">1</span>
        <strong data-testid="no">2</strong>
        <span data-testid="yes">3</span>
      </Filtered>,
    );

    assert.equal(screen.queryByTestId('no'), null);
    assert.equal(screen.queryByText('2'), null);
    assert.equal(screen.queryAllByTestId('yes').length, 2);
    assert.notEqual(screen.queryByText('1'), null);
    assert.notEqual(screen.queryByText('3'), null);
  });

  it('does not filter nested elements', () => {
    render(
      <Filtered>
        <span data-testid="yes">1</span>
        <span data-testid="yes">
          <strong data-testid="yes">2</strong>
        </span>
        <span data-testid="yes">3</span>
      </Filtered>,
    );

    assert.equal(screen.queryAllByTestId('yes').length, 4);
    assert.notEqual(screen.queryByText('1'), null);
    assert.notEqual(screen.queryByText('2'), null);
    assert.notEqual(screen.queryByText('3'), null);
  });

  it('can handle empty children', async () => {
    render(<Filtered />);

    const { textContent } = await screen.findByTestId('filtered');
    assert.equal(textContent, '');
  });
});
