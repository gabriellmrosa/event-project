/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/tests/**/*.test.ts'],
  verbose: true,
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup/mockDatabase.ts',
    '<rootDir>/tests/setup/setupTests.ts'
  ],
  detectOpenHandles: true,
  clearMocks: true,
};
