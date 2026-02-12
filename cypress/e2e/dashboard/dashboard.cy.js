const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');

describe('Dashboard Tests', () => {

    beforeEach(() => {
        LoginPage.login('Admin', 'admin123');
    });

    it('should load the dashboard successfully', () => {
        DashboardPage.verifyDashboardLoaded();
    });

    it('should navigate to Admin module', () => {
        DashboardPage.navigateToModule('Admin');
        cy.contains('h6', 'User Management').should('be.visible');
    });

});
