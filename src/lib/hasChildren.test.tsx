import assert from 'node:assert';
import { describe, it } from 'node:test';
import React from 'react';
import hasChildren from './hasChildren.js';

describe('hasChildren', () => {
  describe('returns true', () => {
    it('with elements', () => {
      const element = (
        <>
          <span />
          <span />
        </>
      );

      assert.equal(hasChildren(element), true);
    });

    it('with text', () => {
      const element = <>My test</>;

      assert.equal(hasChildren(element), true);
    });

    it('with numbers', () => {
      const element = <div>{1}</div>;

      assert.equal(hasChildren(element), true);
    });

    it('with true', () => {
      const element = <div>{true}</div>;

      assert.equal(hasChildren(element), true);
    });

    it('with combined types', () => {
      const element = (
        <>
          <span />
          My test
          {1}
        </>
      );

      assert.equal(hasChildren(element), true);
    });

    it('with valid and non valid types', () => {
      const element = (
        <>
          <span />
          My test
          {null}
          {false}
        </>
      );

      assert.equal(hasChildren(element), true);
    });
  });

  describe('returns false', () => {
    it('when empty', () => {
      const element = <div />;

      assert.equal(hasChildren(element), false);
    });

    it('with null', () => {
      const element = <div>{null}</div>;

      assert.equal(hasChildren(element), false);
    });

    it('with false', () => {
      const element = <div>{null}</div>;

      assert.equal(hasChildren(element), false);
    });
  });
});
