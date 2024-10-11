import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React, {
  cloneElement,
  isValidElement,
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import deepMap from './deepMap.js';

const DeepMapped: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid="deepmapped">
    {deepMap(children, (child: ReactNode) => {
      if (isValidElement<{ 'data-testid': string }>(child) && child.type === 'b') {
        return cloneElement(child, {
          ...child.props,
          'data-testid': 'mapped',
        });
      }
      return child;
    })}
  </div>
);

describe('deepMap', () => {
  it('nested elements', () => {
    render(
      <DeepMapped>
        <b>1</b>
        <b>2</b>
        test text
        <span>
          <b>3</b>
        </span>
        <div>
          <b>
            <b>4</b>
          </b>
        </div>
      </DeepMapped>,
    );

    expect(screen.queryAllByTestId('mapped')).toHaveLength(5);
  });

  it('non nested elements', () => {
    render(
      <DeepMapped>
        <b>1</b>
        <b>2</b>
      </DeepMapped>,
    );

    expect(screen.queryAllByTestId('mapped')).toHaveLength(2);
  });

  it('empty children', async () => {
    render(<DeepMapped />);

    const { textContent } = await screen.findByTestId('deepmapped');
    expect(textContent).toBe('');
  });
});
