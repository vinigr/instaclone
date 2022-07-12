module.exports = {
  displayName: "instaclone-server",
  preset: "ts-jest",
  testPathIgnorePatterns: ["/node_modules/", "./dist"],
  coverageReporters: ["lcov", "html"],
  globalSetup: "<rootDir>/test/environment/globalSetup.ts",
  globalTeardown: "<rootDir>/test/environment/globalTeardown.ts",
  setupFilesAfterEnv: ["<rootDir>/test/setupFile.ts"],
  resetModules: false,
  reporters: ["default", "jest-junit"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|tsx)?$",
  moduleFileExtensions: ["ts", "js", "tsx", "json"],
};
