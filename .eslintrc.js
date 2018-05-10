module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },

  extends: 'standard',

  // plugin for linting .vue files
  plugins: [
    'vue'
  ],

  "rules": {
    // allow paren-less arrow fun
    'allow-parens': 0,
    // warn if trailing comma
    'comma-dangle': [1, 'never'],
    // allow async-await
    'generator-star-spacing': 0,
    // semicolon needed
    'semi': ['warn', 'always'],
    // add space before function parameters
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never'
    }]
  }
};
