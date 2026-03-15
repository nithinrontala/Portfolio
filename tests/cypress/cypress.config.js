const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Start a local server before running:
    //   npx serve "c:\Users\ronta\Documents\Portfolio" -l 3000
    // Override via env: set CYPRESS_BASE_URL=http://127.0.0.1:5500
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    specPattern: "e2e/**/*.cy.js",
    supportFile: false,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 6000,
    viewportWidth: 1280,
    viewportHeight: 900,
  },
});
