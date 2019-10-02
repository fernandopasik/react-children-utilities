module.exports = {
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx'],
  testEnvironment: 'enzyme',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.all.json',
    },
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
};
