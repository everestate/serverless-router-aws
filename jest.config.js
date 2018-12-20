module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: false,
  collectCoverageFrom: [
    '**/*.js',
    '!.eslintrc.js',
    '!jest.config.js',
    '!webpack.config.js',
    '!coverage/**/*.*',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    'lib/DynamoDB/__tests__/__fixtures__/',
  ],
};
