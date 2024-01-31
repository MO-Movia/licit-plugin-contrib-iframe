module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'react/jsx-sort-props': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'consistent-return': 'error',
    'no-debugger': 'error',
    'no-invalid-regexp': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-undef': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],
    'no-var': 'error',
    'prefer-const': 'error',
    quotes: [2, 'single', {avoidEscape: true}],
    semi: [2, 'always'],
    strict: 0,
  },
  globals: {
    HTMLElement: false,
    Event: false,
    MouseEvent: false,
    document: false,
    window: false,
    requestAnimationFrame: false,
    cancelAnimationFrame: false,
  },
  overrides: [
    {
      // enable jest globals in test files
      files: '*.test.ts',
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
    },
  ],
};
