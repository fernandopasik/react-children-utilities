import assert from 'node:assert';
import { describe, it } from 'node:test';
import React from 'react';
import hasComplexChildren from './hasComplexChildren.ts';

describe('hasComplexChildren', () => {
  describe('returns true', () => {
    it('with elements', () => {
      const element = (
        <>
          <span />
          <span />
        </>
      );

      assert.equal(hasComplexChildren(element), true);
    });

    it('with combined types', () => {
      const element = (
        <>
          My test
          <span />
          {1}
        </>
      );

      assert.equal(hasComplexChildren(element), true);
    });

    it('with valid and non valid types', () => {
      const element = (
        <>
          {null}
          My test
          <span />
          {false}
        </>
      );

      assert.equal(hasComplexChildren(element), true);
    });
  });

  describe('returns false', () => {
    it('when empty', () => {
      const element = <div />;

      assert.equal(hasComplexChildren(element), false);
    });

    it('with null', () => {
      const element = <div>{null}</div>;

      assert.equal(hasComplexChildren(element), false);
    });

    it('with false', () => {
      const element = <div>{null}</div>;

      assert.equal(hasComplexChildren(element), false);
    });

    it('with text', () => {
      const element = <>My test</>;

      assert.equal(hasComplexChildren(element), false);
    });

    it('with numbers', () => {
      const element = <div>{1}</div>;

      assert.equal(hasComplexChildren(element), false);
    });

    it('with true', () => {
      const element = <div>{true}</div>;

      assert.equal(hasComplexChildren(element), false);
    });
  });
});
