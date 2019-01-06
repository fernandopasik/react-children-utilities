module.exports = {
  collectCoverageFrom: ['src/**'],
  setupFiles: [
    require.resolve('raf/polyfill'),
  ],
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
};
