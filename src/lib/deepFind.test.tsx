import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React, { type FC, type PropsWithChildren, type ReactElement, type ReactNode } from 'react';
import deepFind from './deepFind.js';

describe('deepFind', () => {
  const DeepFound: FC<PropsWithChildren> = ({ children = [] }) => (
    <div>{deepFind(children, (child: ReactNode) => (child as ReactElement).type === 'i')}</div>
  );

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

    expect(screen.queryByTestId('no')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
    expect(screen.queryByText('3')).toBeNull();
    expect(screen.queryAllByTestId('yes')).toHaveLength(1);
    expect(screen.queryByText('2')).not.toBeNull();
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

    expect(screen.queryByTestId('no')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
    expect(screen.queryByText('3')).toBeNull();
    expect(screen.queryAllByTestId('yes')).toHaveLength(2);
    expect(screen.queryByText('2')).not.toBeNull();
  });

  it('a non nested element', () => {
    render(
      <DeepFound>
        <b data-testid="no">1</b>
        <i data-testid="yes">3</i>
      </DeepFound>,
    );

    expect(screen.queryByTestId('no')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
    expect(screen.queryAllByTestId('yes')).toHaveLength(1);
    expect(screen.queryByText('3')).not.toBeNull();
  });

  it('can not find anything', () => {
    render(
      <DeepFound>
        <b data-testid="no">1</b>
        <b data-testid="no">2</b>
      </DeepFound>,
    );

    expect(screen.queryByTestId('no')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
    expect(screen.queryByText('2')).toBeNull();
  });
});
