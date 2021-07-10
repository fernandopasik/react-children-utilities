import React from 'react';
import hasComplexChildren from '../hasComplexChildren.js';

describe('hasComplexChildren', () => {
  describe('returns true', () => {
    it('with elements', () => {
      const element = (
        <>
          <span />
          <span />
        </>
      );

      expect(hasComplexChildren(element)).toBe(true);
    });

    it('with combined types', () => {
      const element = (
        <>
          My test
          <span />
          {1}
        </>
      );

      expect(hasComplexChildren(element)).toBe(true);
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

      expect(hasComplexChildren(element)).toBe(true);
    });
  });

  describe('returns false', () => {
    it('when empty', () => {
      const element = <div />;

      expect(hasComplexChildren(element)).toBe(false);
    });

    it('with null', () => {
      const element = <>{null}</>;

      expect(hasComplexChildren(element)).toBe(false);
    });

    it('with false', () => {
      const element = <>{null}</>;

      expect(hasComplexChildren(element)).toBe(false);
    });

    it('with text', () => {
      const element = <>My test</>;

      expect(hasComplexChildren(element)).toBe(false);
    });

    it('with numbers', () => {
      const element = <>{1}</>;

      expect(hasComplexChildren(element)).toBe(false);
    });

    it('with true', () => {
      const element = <>{true}</>;

      expect(hasComplexChildren(element)).toBe(false);
    });
  });
});
