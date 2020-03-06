module.exports = {
  collectCoverageFrom: ['src/**/*.{j,t}s{,x}'],
  testEnvironment: 'enzyme',
  globals: { 'ts-jest': { tsConfig: 'tsconfig.all.json' } },
  setupFilesAfterEnv: ['jest-enzyme'],
  transform: { '^.+\\.[j|t]sx?$': 'ts-jest' },
};
