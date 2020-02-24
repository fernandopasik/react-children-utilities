module.exports = {
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx'],
  testEnvironment: 'enzyme',
  transform: { '^.+\\.[t|j]sx?$': 'ts-jest' },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.all.json',
    },
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
};
