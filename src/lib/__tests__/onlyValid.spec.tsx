import { describe, expect, it } from '@jest/globals';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import onlyValid from '../onlyValid.js';

const OnlyValid: FC<PropsWithChildren> = ({ children }) => <div>{onlyValid(children)}</div>;
const CustomElement: FC<PropsWithChildren> = () => <div>I am a react element</div>;

describe('onlyValid', () => {
  it('does not filter all valid html elements', () => {
    const element = TestRenderer.create(
      <OnlyValid>
        <span>0</span>
        <i>2</i>
      </OnlyValid>,
    );

    expect(element.toJSON()).toMatchInlineSnapshot(`
      <div>
        <span>
          0
        </span>
        <i>
          2
        </i>
      </div>
    `);
  });

  it('does not filter all valid html and custom elements', () => {
    const element = TestRenderer.create(
      <OnlyValid>
        <span>0</span>
        <CustomElement />
        <i>2</i>
      </OnlyValid>,
    );

    expect(element.toJSON()).toMatchInlineSnapshot(`
      <div>
        <span>
          0
        </span>
        <div>
          I am a react element
        </div>
        <i>
          2
        </i>
      </div>
    `);
  });

  it('does not filter nested all valid elements', () => {
    const element = TestRenderer.create(
      <OnlyValid>
        <span>0</span>
        <i>2</i>
        <span>
          <strong>3</strong>
          <strong>
            <strong>4</strong>
          </strong>
        </span>
      </OnlyValid>,
    );

    expect(element.toJSON()).toMatchInlineSnapshot(`
      <div>
        <span>
          0
        </span>
        <i>
          2
        </i>
        <span>
          <strong>
            3
          </strong>
          <strong>
            <strong>
              4
            </strong>
          </strong>
        </span>
      </div>
    `);
  });

  it('filters non react elements', () => {
    const element = TestRenderer.create(
      <OnlyValid>
        <span>0</span>
        text
        <i>2</i>
        {null}
        {3}
        {true}
        {false}
        {undefined}
        <b>3</b>
      </OnlyValid>,
    );

    expect(element.toJSON()).toMatchInlineSnapshot(`
      <div>
        <span>
          0
        </span>
        <i>
          2
        </i>
        <b>
          3
        </b>
      </div>
    `);
  });

  it('filters nested non react elements', () => {
    const element = TestRenderer.create(
      <OnlyValid>
        <span>0</span>
        text
        <i>2</i>
        <span>
          <strong>3</strong>
          {null}
          {3}
          {true}
          <strong>
            <strong>4</strong>
            {false}
          </strong>
          {undefined}
        </span>
      </OnlyValid>,
    );

    expect(element.toJSON()).toMatchInlineSnapshot(`
      <div>
        <span>
          0
        </span>
        <i>
          2
        </i>
        <span>
          <strong>
            3
          </strong>
          <strong>
            <strong>
              4
            </strong>
          </strong>
        </span>
      </div>
    `);
  });

  it('works on empty', () => {
    const element = TestRenderer.create(<OnlyValid />);

    expect(element.toJSON()).toMatchInlineSnapshot(`<div />`);
  });

  it('can filter all elements', () => {
    const element = TestRenderer.create(
      <OnlyValid>
        text
        {null}
        {3}
        {true}
        {false}
        {undefined}
      </OnlyValid>,
    );

    expect(element.toJSON()).toMatchInlineSnapshot(`<div />`);
  });
});
