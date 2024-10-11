import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React, { type FC, type PropsWithChildren, type ReactNode } from 'react';
import onlyText, { childToString } from './onlyText.js';

describe('onlyText', () => {
  const OnlyText: FC<PropsWithChildren> = ({ children }) => (
    <div data-testid="only">{onlyText(children)}</div>
  );

  it('on nested elements', async () => {
    render(
      <OnlyText>
        <span>0</span>
        <b>1</b>
        <span>
          <i>2</i>
        </span>
        <i>3</i>
      </OnlyText>,
    );

    const { textContent } = await screen.findByTestId('only');
    expect(textContent).toBe('0123');
  });

  it('on non nested elements', async () => {
    render(
      <OnlyText>
        <span>0</span>
        <b>1</b>
      </OnlyText>,
    );

    const { textContent } = await screen.findByTestId('only');
    expect(textContent).toBe('01');
  });

  it('on empty', async () => {
    render(<OnlyText />);

    const { textContent } = await screen.findByTestId('only');
    expect(textContent).toBe('');
  });

  it('on empty child', async () => {
    render(
      <OnlyText>
        <span />
      </OnlyText>,
    );

    const { textContent } = await screen.findByTestId('only');
    expect(textContent).toBe('');
  });

  it('on text', async () => {
    render(<OnlyText>test 1 test 2</OnlyText>);

    const { textContent } = await screen.findByTestId('only');
    expect(textContent).toBe('test 1 test 2');
  });

  it('on number', async () => {
    render(
      <OnlyText>
        {1}
        {2}
      </OnlyText>,
    );

    const { textContent } = await screen.findByTestId('only');
    expect(textContent).toBe('12');
  });

  it('on true', async () => {
    render(<OnlyText>{true}</OnlyText>);

    const { textContent } = await screen.findByTestId('only');
    expect(textContent).toBe('');
  });

  it('on false', async () => {
    render(<OnlyText>{false}</OnlyText>);

    const { textContent } = await screen.findByTestId('only');
    expect(textContent).toBe('');
  });

  it('on null', async () => {
    render(<OnlyText>{null}</OnlyText>);

    const { textContent } = await screen.findByTestId('only');
    expect(textContent).toBe('');
  });

  it('on combined types', async () => {
    render(
      <OnlyText>
        example
        {null}
        {3}
        {true}
        {false}
        <i>b</i>
      </OnlyText>,
    );

    const { textContent } = await screen.findByTestId('only');
    expect(textContent).toBe('example3b');
  });

  describe('child to string', () => {
    it('string', () => {
      expect(childToString('a')).toBe('a');
    });

    it('number', () => {
      expect(childToString(1)).toBe('1');
    });

    it('boolean', () => {
      expect(childToString(true)).toBe('');
    });

    it('{}', () => {
      expect(childToString({} as ReactNode)).toBe('');
    });

    it('null', () => {
      expect(childToString(null)).toBe('');
    });

    it('undefined', () => {
      expect(childToString()).toBe('');
    });
  });
});
