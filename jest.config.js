/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '**/*.{ts,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ]
};