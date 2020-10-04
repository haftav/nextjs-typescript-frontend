module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  // testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleDirectories: ['<rootDir>', 'node_modules'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};
