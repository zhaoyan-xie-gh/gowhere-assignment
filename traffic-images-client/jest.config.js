const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  bail: 0,
  testTimeout: 20000,
};

module.exports = createJestConfig(customJestConfig);
