const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
    watchForFileChanges: false,
    e2e: {
        baseUrl: 'https://opensource-demo.orangehrmlive.com/',
        specPattern: 'cypress/e2e/**/*.cy.js',
        supportFile: 'cypress/support/e2e.js',

        setupNodeEvents(on, config) {
            allureWriter(on, config);
            return config;
        },

        env: {
            allure: true,
            allureResultsPath: 'allure-results'
        }
    }
});
