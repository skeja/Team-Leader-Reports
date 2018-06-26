module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },

  extends: [
    'standard',
    'plugin:vue/recommended'
  ],

  // plugin for linting .vue files
  plugins: [ 'vue' ],

  'env' : { "browser": true },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,

    // warn if there is a trailing comma
    'comma-dangle': [1, 'never'],

    // allow async-await
    'generator-star-spacing': 0,

    // semicolons are necessary
    'semi': ['warn', 'always'],

    // add space before function parameters
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never'
    }],
    'object-curly-spacing': ['error', 'always'],

    'vue/html-self-closing': 0,
    'vue/max-attributes-per-line': [2, {
      'singleline': 2,
      'multiline': {
        'max': 2,
        'allowFirstLine': true
      }
    }]
  }
}
