import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'react-children-utilities.js',
    output: {
      file: 'react-children-utilities.min.js',
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
