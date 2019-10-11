const OFF = 0 // eslint-disable-line no-unused-vars
const WARN = 1 // eslint-disable-line no-unused-vars
const ERROR = 2 // eslint-disable-line no-unused-vars

module.exports = {
  extends: [
    'airbnb-base',
    'prettier',
  ],
  env: {
    browser: true,
  },
  plugins: [
    'prettier',
  ],
  rules: {
    'no-param-reassign': [ERROR, { props: false }],
    'quote-props': [ERROR, 'consistent-as-needed'],
    'prettier/prettier': [ERROR, {
      'singleQuote': true,
      'trailingComma': 'all',
      'semi': false,
    }],
    'prefer-destructuring': [ERROR, {
      'object': false,
    }],
    'no-new': 'off'
  }
}
