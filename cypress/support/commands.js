const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const AdminPage = require('../pages/AdminPage');
const AddUserPage = require('../pages/AddUserPage');
Cypress.Commands.add('addUser', (username, password) => {
    DashboardPage.navigateToModule('Admin');
    AdminPage.verifyAdminPageLoaded();
    AdminPage.clickAddUser();

    AddUserPage.selectUserRole('ESS');
    AddUserPage.enterEmployeeName('Paul Collings');
    AddUserPage.selectStatus('Enabled');
    AddUserPage.enterUsername(username);
    AddUserPage.enterPassword(password);
    AddUserPage.save();
});

Cypress.Commands.add('login', (userKey = 'validUser') => {
    cy.fixture('testdata').then((data) => {
        const creds = data[userKey];
        LoginPage.login(creds.username, creds.password);
    });
});

