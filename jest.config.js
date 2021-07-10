export default {
  collectCoverageFrom: ['src/**/*.{j,t}s{,x}'],
  globals: { 'ts-jest': { tsconfig: 'tsconfig.all.json' } },
  moduleNameMapper: { '(.*)\\.js': '$1' },
  testEnvironment: 'node',
  transform: { '^.+\\.[j|t]sx?$': 'ts-jest' },
};
