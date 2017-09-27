module.exports = {
  collectCoverageFrom: ['src/**'],
  setupFiles: [
    require.resolve('raf/polyfill'),
  ],
  setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
};
