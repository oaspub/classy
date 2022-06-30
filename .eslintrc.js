module.exports = {
  extends: 'standard-with-typescript',
  ignorePatterns: [
    'dist/**/*'
  ],
  parserOptions: {
    project: './tsconfig.eslint.json'
  }
}
