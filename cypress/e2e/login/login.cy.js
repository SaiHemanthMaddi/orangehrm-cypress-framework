/// <reference types="cypress" />
const LoginPage = require('../../pages/LoginPage');

describe('Login Tests - OrangeHRM Demo', () => {
    beforeEach(() => {
        cy.writeFile('execution_trace.txt', 'Starting test...\n');
        // Ensure starting from login page
        LoginPage.visit();
        cy.writeFile('execution_trace.txt', 'Visited login page\n', { flag: 'a+' });
    });

    it('valid login', () => {
        cy.fixture('testdata').then((data) => {
            cy.writeFile('execution_trace.txt', 'Loaded fixture\n', { flag: 'a+' });
            const { username, password } = data.validUser;
            LoginPage.enterUsername(username);
            cy.writeFile('execution_trace.txt', 'Entered username\n', { flag: 'a+' });
            LoginPage.enterPassword(password);
            cy.writeFile('execution_trace.txt', 'Entered password\n', { flag: 'a+' });
            LoginPage.clickLogin();
            cy.writeFile('execution_trace.txt', 'Clicked login\n', { flag: 'a+' });
            // verify redirected to dashboard or topbar exists
            LoginPage.verifyDashboardLoaded();
            cy.writeFile('execution_trace.txt', 'Verified dashboard\n', { flag: 'a+' });
        });
    });

    it('invalid login', () => {
        cy.writeFile('execution_trace.txt', 'Starting invalid login\n', { flag: 'a+' });
        cy.fixture('testdata').then((data) => {
            const { username, password } = data.invalidUser;

            LoginPage.enterUsername(username);
            LoginPage.enterPassword(password);
            LoginPage.clickLogin();

            LoginPage.getErrorMessage()
                .should('be.visible')
                .and('contain.text', 'Invalid'); // partial match, safest
            cy.writeFile('execution_trace.txt', 'Verified invalid login\n', { flag: 'a+' });
        });
    });

    it('empty fields validation', () => {
        cy.writeFile('execution_trace.txt', 'Starting empty fields validation\n', { flag: 'a+' });
        // Click login without entering anything
        LoginPage.clickLogin();
        // Expect validation errors present (OrangeHRM shows inline/alert)
        LoginPage.getRequiredFieldErrors().should('be.visible');
        cy.writeFile('execution_trace.txt', 'Verified empty fields\n', { flag: 'a+' });
    });
});
