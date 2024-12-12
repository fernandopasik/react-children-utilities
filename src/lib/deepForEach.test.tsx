import 'global-jsdom/register';

import { cleanup, render, screen } from '@testing-library/react';
import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';
import React, { isValidElement, type FC, type PropsWithChildren, type ReactNode } from 'react';
import deepForEach from './deepForEach.js';
import hasChildren from './hasChildren.js';

describe('deepForEach', () => {
  const DeepForEached: FC<PropsWithChildren> = ({ children }) => {
    const items: ReactNode[] = [];
    deepForEach(children, (child: ReactNode, index) => {
      if (isValidElement(child) && child.type === 'b' && hasChildren(child)) {
        const item = child.props.children;
        items.push(
          <span data-testid="foreach" key={index}>
            {item}
          </span>,
        );
      }
    });
    return <div data-testid="deepforeach">{items}</div>;
  };

  beforeEach(() => {
    cleanup();
  });

  it('on nested elements', () => {
    render(
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

    assert.equal(screen.queryAllByTestId('foreach').length, 4);
  });

  it('on non nested elements', () => {
    render(
      <DeepForEached>
        <b>1</b>
        <b>2</b>
      </DeepForEached>,
    );

    assert.equal(screen.queryAllByTestId('foreach').length, 2);
  });

  it('on empty', async () => {
    render(<DeepForEached />);

    const { textContent } = await screen.findByTestId('deepforeach');
    assert.equal(textContent, '');
  });
});
