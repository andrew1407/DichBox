module.exports = {
  testEnvironment: 'jsdom',
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/jest/styleMock.js',
    '\\.(png|jpe?g|gif)': '<rootDir>/jest/fileMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest/setUpTests.js']
};
