module.exports = {
  testEnvironment: 'enzyme',
  collectCoverageFrom: ['src/**/*.ts{,x}'],
  transform: { '^.+\\.[t|j]sx?$': 'ts-jest' },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.all.json',
    },
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
};
