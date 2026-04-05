import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import formatjs from 'eslint-plugin-formatjs';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/.next/**'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  ...compat.extends('plugin:react/recommended', 'prettier', 'next'),

  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tseslint.plugin,
      formatjs: (formatjs as any).default ?? formatjs,
      'react-hooks': reactHooks,
    },
    rules: {
      'no-unused-vars': 'off',

      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-page-custom-font': 'off',

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../'],
              message: 'Avoid relative imports to parent directories. Use absolute imports instead.',
            },
          ],
        },
      ],

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/static-components': 'warn',

      'formatjs/enforce-default-message': ['error', 'literal'],
      'formatjs/no-multiple-whitespaces': ['error'],
      'formatjs/enforce-id': ['warn', { idInterpolationPattern: '[sha512:contenthash:base64:6]' }],
    },
  }
);
