import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'dist/index.js',
    output: {
      file: 'dist/react-children-utilities.js',
      format: 'esm',
      sourcemap: true,
    },
  },
  {
    input: 'dist/index.js',
    output: {
      file: 'dist/react-children-utilities.min.js',
      format: 'esm',
      sourcemap: true,
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
