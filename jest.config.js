/* eslint-disable @typescript-eslint/naming-convention */

export default {
  collectCoverageFrom: ['src/**/*.{j,t}s{,x}'],
  globals: { 'ts-jest': { useESM: true } },
  moduleNameMapper: { '(.*)\\.js': '$1' },
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
};
