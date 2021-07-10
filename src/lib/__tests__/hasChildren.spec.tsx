import React from 'react';
import hasChildren from '../hasChildren.js';

describe('hasChildren', () => {
  describe('returns true', () => {
    it('with elements', () => {
      const element = (
        <>
          <span />
          <span />
        </>
      );

      expect(hasChildren(element)).toBe(true);
    });

    it('with text', () => {
      const element = <>My test</>;

      expect(hasChildren(element)).toBe(true);
    });

    it('with numbers', () => {
      const element = <>{1}</>;

      expect(hasChildren(element)).toBe(true);
    });

    it('with true', () => {
      const element = <>{true}</>;

      expect(hasChildren(element)).toBe(true);
    });

    it('with combined types', () => {
      const element = (
        <>
          <span />
          My test
          {1}
        </>
      );

      expect(hasChildren(element)).toBe(true);
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

      expect(hasChildren(element)).toBe(true);
    });
  });

  describe('returns false', () => {
    it('when empty', () => {
      const element = <div />;

      expect(hasChildren(element)).toBe(false);
    });

    it('with null', () => {
      const element = <>{null}</>;

      expect(hasChildren(element)).toBe(false);
    });

    it('with false', () => {
      const element = <>{null}</>;

      expect(hasChildren(element)).toBe(false);
    });
  });
});
