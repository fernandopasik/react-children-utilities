import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React, { type FC, type PropsWithChildren, type ReactElement, type ReactNode } from 'react';
import deepFilter from './deepFilter.js';

describe('deepFilter', () => {
  const DeepFiltered: FC<PropsWithChildren> = ({ children }) => (
    <div data-testid="filtered">
      {deepFilter(children, (item: ReactNode) => (item as ReactElement).type === 'span')}
    </div>
  );

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

    expect(screen.queryByTestId('no')).toBeNull();
    expect(screen.queryByText('3')).toBeNull();
    expect(screen.queryByText('4')).toBeNull();
    expect(screen.queryAllByTestId('yes')).toHaveLength(5);
    expect(screen.queryByText('1')).not.toBeNull();
    expect(screen.queryByText('2')).not.toBeNull();
    expect(screen.queryByText('5')).not.toBeNull();
  });

  it('non nested elements', () => {
    render(
      <DeepFiltered>
        <strong data-testid="no">1</strong>
        <span data-testid="yes">2</span>
      </DeepFiltered>,
    );

    expect(screen.queryByTestId('no')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
    expect(screen.queryAllByTestId('yes')).toHaveLength(1);
    expect(screen.queryByText('2')).not.toBeNull();
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

    expect(screen.queryByTestId('no')).toBeNull();
    expect(screen.queryByText('4')).toBeNull();
    expect(screen.queryByText('5')).toBeNull();
    expect(screen.queryAllByTestId('yes')).toHaveLength(4);
    expect(screen.queryByText('1')).not.toBeNull();
    expect(screen.queryByText('2')).not.toBeNull();
    expect(screen.queryByText('3')).not.toBeNull();
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

    expect(screen.queryByTestId('no')).toBeNull();
    expect(screen.queryByText('3')).toBeNull();
    expect(screen.queryByText('4')).toBeNull();
    expect(screen.queryByText('5')).toBeNull();
    expect(screen.queryAllByTestId('yes')).toHaveLength(3);
    expect(screen.queryByText('1')).not.toBeNull();
    expect(screen.queryByText('2')).not.toBeNull();
  });

  it('can handle empty children', async () => {
    render(<DeepFiltered />);

    const { textContent } = await screen.findByTestId('filtered');
    expect(textContent).toBe('');
  });
});
