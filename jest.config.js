export default {
  collectCoverageFrom: ['src/**/*.{j,t}s{,x}'],
  globals: { 'ts-jest': { tsconfig: 'tsconfig.all.json' } },
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'enzyme',
  transform: { '^.+\\.[j|t]sx?$': 'ts-jest' },
};
