import 'global-jsdom/register';

import { cleanup, render, screen } from '@testing-library/react';
import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';
import React, { type FC, type PropsWithChildren } from 'react';
import onlyValid from './onlyValid.ts';

describe('onlyValid', () => {
  const OnlyValid: FC<PropsWithChildren> = ({ children }) => (
    <div data-testid="onlyvalid">{onlyValid(children)}</div>
  );

  beforeEach(() => {
    cleanup();
  });

  it('does not filter all valid html elements', () => {
    render(
      <OnlyValid>
        <span data-testid="yes">0</span>
        <i data-testid="yes">2</i>
      </OnlyValid>,
    );

    assert.equal(screen.queryAllByTestId('yes').length, 2);
    assert.notEqual(screen.queryByText('0'), null);
    assert.notEqual(screen.queryByText('2'), null);
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

    assert.equal(screen.queryAllByTestId('yes').length, 3);
    assert.notEqual(screen.queryByText('0'), null);
    assert.notEqual(screen.queryByText('2'), null);
    assert.notEqual(screen.queryByText('I am a react element'), null);
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

    assert.equal(screen.queryAllByTestId('yes').length, 6);
    assert.notEqual(screen.queryByText('0'), null);
    assert.notEqual(screen.queryByText('2'), null);
    assert.notEqual(screen.queryByText('3'), null);
    assert.notEqual(screen.queryByText('4'), null);
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

    assert.equal(screen.queryAllByTestId('yes').length, 3);
    assert.notEqual(screen.queryByText('0'), null);
    assert.notEqual(screen.queryByText('2'), null);
    assert.notEqual(screen.queryByText('4'), null);
    assert.equal(screen.queryByText('text'), null);
    assert.equal(screen.queryByText('null'), null);
    assert.equal(screen.queryByText('3'), null);
    assert.equal(screen.queryByText('true'), null);
    assert.equal(screen.queryByText('false'), null);
    assert.equal(screen.queryByText('undefined'), null);
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

    assert.equal(screen.queryAllByTestId('yes').length, 6);
    assert.notEqual(screen.queryByText('0'), null);
    assert.notEqual(screen.queryByText('2'), null);
    assert.notEqual(screen.queryByText('4'), null);
    assert.notEqual(screen.queryByText('5'), null);
    assert.equal(screen.queryByText('text'), null);
    assert.equal(screen.queryByText('null'), null);
    assert.equal(screen.queryByText('3'), null);
    assert.equal(screen.queryByText('true'), null);
    assert.equal(screen.queryByText('false'), null);
    assert.equal(screen.queryByText('undefined'), null);
  });

  it('works on empty', async () => {
    render(<OnlyValid />);

    const { textContent } = await screen.findByTestId('onlyvalid');
    assert.equal(textContent, '');
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
    assert.equal(textContent, '');
    assert.equal(screen.queryByText('text'), null);
    assert.equal(screen.queryByText('null'), null);
    assert.equal(screen.queryByText('3'), null);
    assert.equal(screen.queryByText('true'), null);
    assert.equal(screen.queryByText('false'), null);
    assert.equal(screen.queryByText('undefined'), null);
  });
});
