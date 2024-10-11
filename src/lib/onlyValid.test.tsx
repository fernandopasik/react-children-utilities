import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React, { type FC, type PropsWithChildren } from 'react';
import onlyValid from './onlyValid.js';

describe('onlyValid', () => {
  const OnlyValid: FC<PropsWithChildren> = ({ children }) => (
    <div data-testid="onlyvalid">{onlyValid(children)}</div>
  );

  it('does not filter all valid html elements', () => {
    render(
      <OnlyValid>
        <span data-testid="yes">0</span>
        <i data-testid="yes">2</i>
      </OnlyValid>,
    );

    expect(screen.queryAllByTestId('yes')).toHaveLength(2);
    expect(screen.queryByText('0')).not.toBeNull();
    expect(screen.queryByText('2')).not.toBeNull();
  });

  it('does not filter all valid html and custom elements', () => {
    const CustomElement: FC<PropsWithChildren> = () => (
      <div data-testid="yes">I am a react element</div>
    );

    render(
      <OnlyValid>
        <span data-testid="yes">0</span>
        <CustomElement />
        <i data-testid="yes">2</i>
      </OnlyValid>,
    );

    expect(screen.queryAllByTestId('yes')).toHaveLength(3);
    expect(screen.queryByText('0')).not.toBeNull();
    expect(screen.queryByText('2')).not.toBeNull();
    expect(screen.queryByText('I am a react element')).not.toBeNull();
  });

  it('does not filter nested all valid elements', () => {
    render(
      <OnlyValid>
        <span data-testid="yes">0</span>
        <i data-testid="yes">2</i>
        <span data-testid="yes">
          <strong data-testid="yes">3</strong>
          <strong data-testid="yes">
            <strong data-testid="yes">4</strong>
          </strong>
        </span>
      </OnlyValid>,
    );

    expect(screen.queryAllByTestId('yes')).toHaveLength(6);
    expect(screen.queryByText('0')).not.toBeNull();
    expect(screen.queryByText('2')).not.toBeNull();
    expect(screen.queryByText('3')).not.toBeNull();
    expect(screen.queryByText('4')).not.toBeNull();
  });

  it('filters non react elements', () => {
    render(
      <OnlyValid>
        <span data-testid="yes">0</span>
        text
        <i data-testid="yes">2</i>
        {null}
        {3}
        {true}
        {false}
        {undefined}
        <b data-testid="yes">4</b>
      </OnlyValid>,
    );

    expect(screen.queryAllByTestId('yes')).toHaveLength(3);
    expect(screen.queryByText('0')).not.toBeNull();
    expect(screen.queryByText('2')).not.toBeNull();
    expect(screen.queryByText('4')).not.toBeNull();
    expect(screen.queryByText('text')).toBeNull();
    expect(screen.queryByText('null')).toBeNull();
    expect(screen.queryByText('3')).toBeNull();
    expect(screen.queryByText('true')).toBeNull();
    expect(screen.queryByText('false')).toBeNull();
    expect(screen.queryByText('undefined')).toBeNull();
  });

  it('filters nested non react elements', () => {
    render(
      <OnlyValid>
        <span data-testid="yes">0</span>
        text
        <i data-testid="yes">2</i>
        <span data-testid="yes">
          <strong data-testid="yes">4</strong>
          {null}
          {3}
          {true}
          <strong data-testid="yes">
            <strong data-testid="yes">5</strong>
            {false}
          </strong>
          {undefined}
        </span>
      </OnlyValid>,
    );

    expect(screen.queryAllByTestId('yes')).toHaveLength(6);
    expect(screen.queryByText('0')).not.toBeNull();
    expect(screen.queryByText('2')).not.toBeNull();
    expect(screen.queryByText('4')).not.toBeNull();
    expect(screen.queryByText('5')).not.toBeNull();
    expect(screen.queryByText('text')).toBeNull();
    expect(screen.queryByText('null')).toBeNull();
    expect(screen.queryByText('3')).toBeNull();
    expect(screen.queryByText('true')).toBeNull();
    expect(screen.queryByText('false')).toBeNull();
    expect(screen.queryByText('undefined')).toBeNull();
  });

  it('works on empty', async () => {
    render(<OnlyValid />);

    const { textContent } = await screen.findByTestId('onlyvalid');
    expect(textContent).toBe('');
  });

  it('can filter all elements', async () => {
    render(
      <OnlyValid>
        text
        {null}
        {3}
        {true}
        {false}
        {undefined}
      </OnlyValid>,
    );

    const { textContent } = await screen.findByTestId('onlyvalid');
    expect(textContent).toBe('');
    expect(screen.queryByText('text')).toBeNull();
    expect(screen.queryByText('null')).toBeNull();
    expect(screen.queryByText('3')).toBeNull();
    expect(screen.queryByText('true')).toBeNull();
    expect(screen.queryByText('false')).toBeNull();
    expect(screen.queryByText('undefined')).toBeNull();
  });
});
