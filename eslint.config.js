import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import ymlPlugin from 'eslint-plugin-yml';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
  { ignores: ['coverage', 'lib', 'react-children-utilities.*', '_site'] },
  eslint.configs.all,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  importPlugin.flatConfigs.recommended,
  importPlugin.configs.typescript,
  ...ymlPlugin.configs['flat/recommended'],
  ...ymlPlugin.configs['flat/prettier'],
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true }, project: 'tsconfig.json' },
      sourceType: 'module',
    },
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      'import/no-unresolved': 'off',
      'max-lines': ['error', { max: 130, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['error', { max: 24, skipBlankLines: true, skipComments: true }],
      'no-ternary': 'off',
      'no-useless-assignment': 'off',
      'one-var': 'off',
      'sort-imports': 'off',
    },
    settings: {
      'import/resolver': { typescript: {} },
      react: { version: 'detect' },
    },
  },
  {
    // eslint-disable-next-line import/no-named-as-default-member
    extends: [...ts.configs.all],
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // eslint-disable-next-line no-magic-numbers
      '@typescript-eslint/no-magic-numbers': ['error', { ignore: [0, 1] }],
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  },
  {
    files: ['**/*.test.*'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'no-undefined': 'off',
    },
  },
  prettier,
);
