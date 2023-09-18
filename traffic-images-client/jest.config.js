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
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  bail: 1,
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/**/*.test.ts",
    "!src/**/*.test.tsx",
    "!src/**/types.ts",
    "!src/**/constants/*.ts",
    "!src/**/queryKeys.ts",
    "!src/**/services.ts",
    "!src/middleware.ts",
    "!src/config/*.ts",
    "!src/gateways/*.ts",
    "!src/lib/*.ts",
    "!src/**/_app.tsx",
  ],
};

module.exports = createJestConfig(customJestConfig);
