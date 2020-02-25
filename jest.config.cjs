module.exports = {
  collectCoverageFrom: ['src/**/*.{j,t}s{,x}'],
  testEnvironment: 'enzyme',
  transform: { '^.+\\.[t|j]sx?$': 'ts-jest' },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.all.json',
    },
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
};
