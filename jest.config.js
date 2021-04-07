module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverageFrom: ["**/*.test.{js,jsx,ts,tsx}"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/src/__tests__/test-utils.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
}
