module.exports = {
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx'],
  testEnvironment: 'enzyme',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['jest-enzyme'],
};
