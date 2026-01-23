import assert from 'node:assert';
import { describe, it } from 'node:test';
import React, { type FunctionComponent, type ReactElement } from 'react';
import getElementName from './getElementName.ts';

describe('getElementName', () => {
  it('of a html element', () => {
    assert.equal(getElementName(<div />), 'div');
    assert.equal(getElementName(<span />), 'span');
  });

  it('of non elements', () => {
    assert.equal(getElementName('div'), null);
    assert.equal(getElementName(null), null);
    assert.equal(getElementName(3), null);
    assert.equal(getElementName(undefined), null);
  });

  it('of a functional component', () => {
    const Example: FunctionComponent = () => <div />;

    assert.equal(getElementName(<Example />), 'Example');
  });

  it('of a class component', () => {
    class Example extends React.Component {
      // eslint-disable-next-line class-methods-use-this
      public override render(): ReactElement {
        return <div />;
      }
    }

    assert.equal(getElementName(<Example />), 'Example');
  });
});
