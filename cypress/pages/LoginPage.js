class LoginPage {
    constructor() {
        // Modern OrangeHRM (5.x) login selectors (resilient)
        this.usernameInput = 'input[placeholder="Username"]';
        this.passwordInput = 'input[placeholder="Password"]';
        this.loginButton = 'button[type="submit"]';
        // Error / alert container used by OrangeHRM 5.x
        this.errorAlert = '.oxd-alert-content';
        // Page unique element after login
        this.dashboardHeader = 'header[role="banner"], .oxd-topbar-header-title';
    }

    visit() {
        cy.visit('/web/index.php/auth/login');
        return this;
    }

    enterUsername(username) {
        cy.get(this.usernameInput).clear().type(username);
        return this;
    }

    enterPassword(password) {
        cy.get(this.passwordInput).clear().type(password);
        return this;
    }

    clickLogin() {
        cy.get(this.loginButton).click();
        return this;
    }

    login(username, password) {
        this.visit();
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLogin();
        return this;
    }

    getErrorMessage() {
        // returns a chainable for assertion
        return cy.get(this.errorAlert);
    }

     getRequiredFieldErrors() {
        return cy.get('.oxd-input-field-error-message');
    }

    verifyDashboardLoaded() {
        // Simple check for dashboard header or top bar presence
        return cy.get(this.dashboardHeader).should('exist');
    }
}

module.exports = new LoginPage();
