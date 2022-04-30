import type { FC, ReactNode } from 'react';
import React from 'react';
import type { ReactTestRendererJSON } from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
import onlyText, { childToString } from '../onlyText.js';

interface Props {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
}

const OnlyText: FC<Props> = ({ children }) => <div>{onlyText(children)}</div>;

describe('onlyText', () => {
  it('on nested elements', () => {
    const element = TestRenderer.create(
      <OnlyText>
        <span>0</span>
        <b>1</b>
        <span>
          <i>2</i>
        </span>
        <i>3</i>
      </OnlyText>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;
    const [text] = children ?? [];

    expect(text).toBe('0123');
  });

  it('on non nested elements', () => {
    const element = TestRenderer.create(
      <OnlyText>
        <span>0</span>
        <b>1</b>
      </OnlyText>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;
    const [text] = children ?? [];

    expect(text).toBe('01');
  });

  it('on empty', () => {
    const element = TestRenderer.create(<OnlyText />);
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toBeNull();
  });

  it('on empty child', () => {
    const element = TestRenderer.create(
      <OnlyText>
        <span />
      </OnlyText>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toBeNull();
  });

  it('on text', () => {
    const element = TestRenderer.create(<OnlyText>test 1 test 2</OnlyText>);
    const { children } = element.toJSON() as ReactTestRendererJSON;
    const [text] = children ?? [];

    expect(text).toBe('test 1 test 2');
  });

  it('on number', () => {
    const element = TestRenderer.create(
      <OnlyText>
        {1}
        {2}
      </OnlyText>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;
    const [text] = children ?? [];

    expect(text).toBe('12');
  });

  it('on true', () => {
    const element = TestRenderer.create(<OnlyText>{true}</OnlyText>);
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toBeNull();
  });

  it('on false', () => {
    const element = TestRenderer.create(<OnlyText>{false}</OnlyText>);
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toBeNull();
  });

  it('on null', () => {
    const element = TestRenderer.create(<OnlyText>{null}</OnlyText>);
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toBeNull();
  });

  it('on combined types', () => {
    const element = TestRenderer.create(
      <OnlyText>
        example
        {null}
        {3}
        {true}
        {false}
        <i>b</i>
      </OnlyText>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;
    const [text] = children ?? [];

    expect(text).toBe('example3b');
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
