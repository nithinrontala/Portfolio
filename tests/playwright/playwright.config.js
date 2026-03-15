// @ts-check
const { defineConfig, devices } = require("@playwright/test");
const path = require("path");

// Use file:// by default; override with BASE_URL env var when using a server.
const portfolioDir = path.resolve(__dirname, "../..");
const defaultBaseURL = `file:///${portfolioDir.replace(/\\/g, "/")}`;
const BASE_URL = (process.env.BASE_URL || defaultBaseURL).replace(/\/$/, "");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  workers: 1,
  fullyParallel: false,
  retries: 1,
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL: BASE_URL,
    headless: true,
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
