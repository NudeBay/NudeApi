/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"></html>',
    url: 'https://jestjs.io/',
    userAgent: 'Mozilla//0_0_7.0, (stable)',
  },
};