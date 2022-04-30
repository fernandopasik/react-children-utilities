import type { FC, ReactNode } from 'react';
import React, { isValidElement } from 'react';
import type { ReactTestRendererJSON } from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
import filter from '../filter.js';

interface Props {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
}

describe('filter', () => {
  it('returns same children', () => {
    const Filtered: FC<Props> = ({ children }) => (
      <div>
        {filter(children, (item: ReactNode) =>
          Boolean(isValidElement(item) && item.type === 'div'),
        )}
      </div>
    );

    const element = TestRenderer.create(
      <Filtered>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Filtered>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toHaveLength(3);
  });

  it('returns only matching children', () => {
    const Filtered: FC<Props> = ({ children }) => (
      <div>
        {filter(children, (item: ReactNode) =>
          Boolean(isValidElement(item) && item.type === 'span'),
        )}
      </div>
    );

    const element = TestRenderer.create(
      <Filtered>
        <span>1</span>
        <strong>2</strong>
        <span>3</span>
      </Filtered>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toHaveLength(2);
    expect(element.root.findAllByType('strong')).toHaveLength(0);
    expect(element.root.findAllByType('span')).toHaveLength(2);
  });

  it('does not filter nested elements', () => {
    const Filtered: FC<Props> = ({ children }) => (
      <div>
        {filter(children, (item: ReactNode) =>
          Boolean(isValidElement(item) && item.type === 'span'),
        )}
      </div>
    );

    const element = TestRenderer.create(
      <Filtered>
        <span>1</span>
        <span>
          <strong>2</strong>
        </span>
        <span>3</span>
      </Filtered>,
    );
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toHaveLength(3);
    expect(element.root.findAllByType('strong')).toHaveLength(1);
  });

  it('can handle empty children', () => {
    const Filtered: FC<Props> = ({ children }) => (
      <div>
        {filter(children, (item: ReactNode) =>
          Boolean(isValidElement(item) && item.type === 'div'),
        )}
      </div>
    );

    const element = TestRenderer.create(<Filtered />);
    const { children } = element.toJSON() as ReactTestRendererJSON;

    expect(children).toBeNull();
  });
});
