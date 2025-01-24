module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '^@/components/(.*)$': '<rootDir>/src/components/$1',
      '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
      '^@/store/(.*)$': '<rootDir>/src/store/$1',
      '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    },
  };