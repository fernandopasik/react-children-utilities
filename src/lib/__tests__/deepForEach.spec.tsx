import type { ReactElement, ReactNode } from 'react';
import React, { isValidElement } from 'react';
import type { ReactTestRendererJSON } from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
import type { ReadonlyDeep } from 'type-fest';
import deepForEach from '../deepForEach.js';

interface Props {
  children?: ReactNode;
}

describe('deepForEach', () => {
  it('on nested elements', () => {
    const DeepForEached = ({ children }: ReadonlyDeep<Props>): ReactElement => {
      const items: ReactNode[] = [];
      deepForEach(children, (child: ReadonlyDeep<ReactNode>) => {
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
    const DeepForEached = ({ children }: ReadonlyDeep<Props>): ReactElement => {
      const items: ReactNode[] = [];
      deepForEach(children, (child: ReadonlyDeep<ReactNode>) => {
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
    const DeepForEached = ({ children }: ReadonlyDeep<Props>): ReactElement => {
      const items: ReactNode[] = [];
      deepForEach(children, (child: ReadonlyDeep<ReactNode>) => {
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
