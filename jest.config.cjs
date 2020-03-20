module.exports = {
  collectCoverageFrom: ['src/**/*.{j,t}s{,x}'],
  globals: { 'ts-jest': { tsConfig: 'tsconfig.all.json' } },
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'enzyme',
  transform: { '^.+\\.[j|t]sx?$': 'ts-jest' },
};
