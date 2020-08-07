module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: [
    'simple-import-sort',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // Imports sorting
    'simple-import-sort/sort': 'error',
    'sort-imports': 'off',
    'import/order': 'off',

    // Imports
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',

    // Allow to reassign properties
    'no-param-reassign': 'off',

    // Default case in switch
    'default-case': 'off',

    // Require consistent return
    'consistent-return': 'off',
    'no-useless-return': 'off',

    // Max length of the line
    'max-len': ['error', { code: 120 }],

    // Allow to use return in the else block
    'no-else-return': ['error', { allowElseIf: true }],

    // Allow unused expressions
    'no-unused-expressions': 'off',

    // Use semi rule from TypeScript ESLint
    semi: 'off',
    '@typescript-eslint/semi': ['error'],

    // Need to use blank lines between class methods/fields only in case with single line member
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

    // Allow to use any
    '@typescript-eslint/no-explicit-any': 'off',

    'import/no-cycle': 'off',
  },
};
