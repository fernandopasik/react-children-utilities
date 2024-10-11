import terser from '@rollup/plugin-terser';

export default [
  {
    external: ['react'],
    input: 'react-children-utilities.js',
    output: {
      file: 'react-children-utilities.min.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      terser({
        mangle: {
          module: true,
          properties: true,
        },
      }),
    ],
  },
];
