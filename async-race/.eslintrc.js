module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      // jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-debugger': 'off',
    'react/jsx-props-no-spreading': 'off',
    'max-len': ['error', { code: 170, tabWidth: 4 }],
    'no-case-declarations': 'off',
  },
};
