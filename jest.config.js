export default {
  collectCoverageFrom: ['src/**/*.{j,t}s{,x}'],
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  preset: 'ts-jest/presets/js-with-ts-esm',
  prettierPath: null,
  testEnvironment: 'jsdom',
};
