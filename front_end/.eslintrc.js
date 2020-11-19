const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react','prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-await-in-loop': 'off',
    'no-use-before-define': 'off',
    'no-restricted-syntax': 'off',
    'global-require': 'off',
    'func-names': 'off',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'quotes': ["warn", "backtick"],
    "parser": "babel-eslint"

  },
  globals: {},
};
