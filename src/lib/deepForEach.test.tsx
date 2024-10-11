import { describe, expect, it } from '@jest/globals';
import React, {
  isValidElement,
  type FC,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import TestRenderer, { type ReactTestRendererJSON } from 'react-test-renderer';
import deepForEach from './deepForEach.js';

describe('deepForEach', () => {
  it('on nested elements', () => {
    const DeepForEached: FC<PropsWithChildren> = ({ children }) => {
      const items: ReactNode[] = [];
      deepForEach(children, (child: ReactNode) => {
        if (isValidElement(child) && child.type === 'b') {
          items.push((child as ReactElement<{ children: ReactNode | ReactNode[] }>).props.children);
        }
      });
      return <div>{items}</div>;
    };

    const element = TestRenderer.create(
      <DeepForEached>
        <b>1</b>
        <b>2</b>
        <span>
          <b>3</b>
        </span>
        <i>non matching</i>
        <div>
          <div>
            <b>4</b>
          </div>
        </div>
        example
      </DeepForEached>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toStrictEqual(['1', '2', '3', '4']);
  });

  it('on non nested elements', () => {
    const DeepForEached: FC<PropsWithChildren> = ({ children }) => {
      const items: ReactNode[] = [];
      deepForEach(children, (child: ReactNode) => {
        if (isValidElement<{ children?: ReactNode[] }>(child) && child.type === 'b') {
          items.push(child.props.children);
        }
      });
      return <div>{items}</div>;
    };

    const element = TestRenderer.create(
      <DeepForEached>
        <b>1</b>
        <b>2</b>
      </DeepForEached>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toStrictEqual(['1', '2']);
  });

  it('on empty', () => {
    const DeepForEached: FC<PropsWithChildren> = ({ children }) => {
      const items: ReactNode[] = [];
      deepForEach(children, (child: ReactNode) => {
        if (isValidElement<{ children?: ReactNode[] }>(child) && child.type === 'b') {
          items.push(child.props.children);
        }
      });
      return <div>{items}</div>;
    };

    const element = TestRenderer.create(<DeepForEached />);
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toBeNull();
  });
});
