// eslint file for JSX
module.exports = {
  parser: '@babel/eslint-parser',
  rules: {
    'react/jsx-filename-extension': [0],
    'react/react-in-jsx-scope': 'off',
  },
  ignorePatterns: ['/*', '!/src'],
};
