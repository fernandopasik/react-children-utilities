import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'dist/index.js',
    output: {
      file: 'dist/react-children-utilities.js',
      format: 'esm',
    },
  },
  {
    input: 'dist/index.js',
    output: {
      file: 'dist/react-children-utilities.min.js',
      format: 'esm',
    },
    plugins: [
      terser({
        warnings: true,
        mangle: {
          module: true,
          properties: true,
        },
      }),
    ],
  },
];
