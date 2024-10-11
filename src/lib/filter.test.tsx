import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React, { isValidElement, type FC, type PropsWithChildren, type ReactNode } from 'react';
import filter from './filter.js';

describe('filter', () => {
  const Filtered: FC<PropsWithChildren> = ({ children }) => (
    <div data-testid="filtered">
      {filter(children, (item: ReactNode) => Boolean(isValidElement(item) && item.type === 'span'))}
    </div>
  );

  it('returns same children', () => {
    render(
      <Filtered>
        <span data-testid="yes">1</span>
        <span data-testid="yes">2</span>
        <span data-testid="yes">3</span>
      </Filtered>,
    );

    expect(screen.queryAllByTestId('yes')).toHaveLength(3);
    expect(screen.queryByText('1')).not.toBeNull();
    expect(screen.queryByText('2')).not.toBeNull();
    expect(screen.queryByText('3')).not.toBeNull();
  });

  it('returns only matching children', () => {
    render(
      <Filtered>
        <span data-testid="yes">1</span>
        <strong data-testid="no">2</strong>
        <span data-testid="yes">3</span>
      </Filtered>,
    );

    expect(screen.queryByTestId('no')).toBeNull();
    expect(screen.queryByText('2')).toBeNull();
    expect(screen.queryAllByTestId('yes')).toHaveLength(2);
    expect(screen.queryByText('1')).not.toBeNull();
    expect(screen.queryByText('3')).not.toBeNull();
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

    expect(screen.queryAllByTestId('yes')).toHaveLength(4);
    expect(screen.queryByText('1')).not.toBeNull();
    expect(screen.queryByText('2')).not.toBeNull();
    expect(screen.queryByText('3')).not.toBeNull();
  });

  it('can handle empty children', async () => {
    render(<Filtered />);

    const { textContent } = await screen.findByTestId('filtered');
    expect(textContent).toBe('');
  });
});
