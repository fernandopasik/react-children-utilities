import 'global-jsdom/register';

import { cleanup, render, screen } from '@testing-library/react';
import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';
import React, { type FC, type PropsWithChildren, type ReactNode } from 'react';
import onlyText, { childToString } from './onlyText.js';

describe('onlyText', () => {
  const OnlyText: FC<PropsWithChildren> = ({ children }) => (
    <div data-testid="only">{onlyText(children)}</div>
  );

  beforeEach(() => {
    cleanup();
  });

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
    assert.equal(textContent, '0123');
  });

  it('on non nested elements', async () => {
    render(
      <OnlyText>
        <span>0</span>
        <b>1</b>
      </OnlyText>,
    );

    const { textContent } = await screen.findByTestId('only');
    assert.equal(textContent, '01');
  });

  it('on empty', async () => {
    render(<OnlyText />);

    const { textContent } = await screen.findByTestId('only');
    assert.equal(textContent, '');
  });

  it('on empty child', async () => {
    render(
      <OnlyText>
        <span />
      </OnlyText>,
    );

    const { textContent } = await screen.findByTestId('only');
    assert.equal(textContent, '');
  });

  it('on text', async () => {
    render(<OnlyText>test 1 test 2</OnlyText>);

    const { textContent } = await screen.findByTestId('only');
    assert.equal(textContent, 'test 1 test 2');
  });

  it('on number', async () => {
    render(
      <OnlyText>
        {1}
        {2}
      </OnlyText>,
    );

    const { textContent } = await screen.findByTestId('only');
    assert.equal(textContent, '12');
  });

  it('on true', async () => {
    render(<OnlyText>{true}</OnlyText>);

    const { textContent } = await screen.findByTestId('only');
    assert.equal(textContent, '');
  });

  it('on false', async () => {
    render(<OnlyText>{false}</OnlyText>);

    const { textContent } = await screen.findByTestId('only');
    assert.equal(textContent, '');
  });

  it('on null', async () => {
    render(<OnlyText>{null}</OnlyText>);

    const { textContent } = await screen.findByTestId('only');
    assert.equal(textContent, '');
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
    assert.equal(textContent, 'example3b');
  });

  describe('child to string', () => {
    it('string', () => {
      assert.equal(childToString('a'), 'a');
    });

    it('number', () => {
      assert.equal(childToString(1), '1');
    });

    it('boolean', () => {
      assert.equal(childToString(true), '');
    });

    it('{}', () => {
      assert.equal(childToString({} as ReactNode), '');
    });

    it('null', () => {
      assert.equal(childToString(null), '');
    });

    it('undefined', () => {
      assert.equal(childToString(), '');
    });
  });
});
