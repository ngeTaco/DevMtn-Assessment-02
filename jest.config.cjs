module.exports = {
  testResultsProcessor: './node_modules/jest-html-reporter',
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['expect-puppeteer'],
  testTimeout: 2000,
};
