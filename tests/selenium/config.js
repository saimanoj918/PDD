/**
 * PDD Core Scheduler - Selenium E2E Test Configuration
 */

const config = {
  baseUrl: process.env.TARGET_URL || 'http://localhost:3000',
  timeout: 15000,
  headless: true,
  testUser: {
    name: 'Test User PDD',
    email: 'pddtestuser_e2e@testmail.com',
    password: 'Test@12345'
  },
  browser: {
    name: 'chrome',
    args: [
      '--headless=new',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080',
      '--disable-extensions',
      '--disable-popup-blocking'
    ]
  },
  // Test categories
  categories: {
    UI_UX: 'UI/UX Test',
    FUNCTIONAL: 'Functional Test',
    VALIDATION: 'Validation Test',
    E2E_INTEGRATION: 'E2E Integration Test',
    DEPLOYMENT: 'Deployable Status Test'
  }
};

module.exports = config;
