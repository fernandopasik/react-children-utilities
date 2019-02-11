module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  setupFiles: [
    require.resolve('raf/polyfill'),
  ],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
};
