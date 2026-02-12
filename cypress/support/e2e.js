import './commands';
import '@shelex/cypress-allure-plugin';
import '@testing-library/cypress/add-commands';


Cypress.on('uncaught:exception', () => false);
