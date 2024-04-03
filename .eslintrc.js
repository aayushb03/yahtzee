module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // Formatting
    indent: ['error', 2],
    camelcase: ['error', { properties: 'always' }],
    // Limit lines to 80 characters (if needed)
    // Adjust the value based on your project requirements
    // 'max-len': ['error', { code: 80 }],
        
    // Interfaces
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      }
    ],
        
    // Variables
    'prefer-const': 'error',
    'no-var': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
        
    // Functions
    'prefer-arrow-callback': 'error',
    'func-style': ['warn', 'expression'],
        
    // Promises and Async/Await
    'prefer-promise-reject-errors': 'error',
    'no-return-await': 'error',
        
  },
};
