
class AddUserPage {

    // Elements
    userRoleDropdown = '.oxd-select-text';
    employeeNameInput = '.oxd-autocomplete-text-input input';
    statusDropdown = '.oxd-select-text';
    usernameInput = '.oxd-input-group:has(label:contains("Username")) input';
    passwordInput = '.oxd-input-group:has(label:contains("Password")) input[type="password"]';
    confirmPasswordInput = '.oxd-input-group:has(label:contains("Confirm Password")) input[type="password"]';
    saveButton = 'button[type="submit"]';

    // Methods
    selectUserRole(role) {
        cy.contains('label', 'User Role')
            .parents('.oxd-input-group')
            .find(this.userRoleDropdown)
            .click();

        cy.contains('.oxd-select-dropdown span', role).click();
    }

    enterEmployeeName(name) {
        const query = name.trim().split(/\s+/)[0];
        cy.get(this.employeeNameInput).clear().type(query, { delay: 200 });

        cy.get('.oxd-autocomplete-dropdown')
            .should('be.visible')
            .find('span')
            .should('have.length.greaterThan', 0)
            .then(($options) => {
                const expected = name.toLowerCase();
                const match = [...$options].find((option) =>
                    option.innerText.toLowerCase().includes(expected)
                );

                cy.wrap(match || $options[0]).click({ force: true });
            });
    }

    selectStatus(status) {
        cy.contains('label', 'Status')
            .parents('.oxd-input-group')
            .find(this.statusDropdown)
            .click();

        cy.contains('.oxd-select-dropdown span', status).click();
    }

    enterUsername(username) {
        cy.get(this.usernameInput).clear().type(username);
    }

    enterPassword(password) {
        cy.get(this.passwordInput).first().clear().type(password);
    }

    confirmPassword(password) {
        cy.get(this.confirmPasswordInput).first().clear().type(password);
    }

    save() {
        cy.get(this.saveButton).click();
    }

    addNewUser(employeeFullName, username, password) {
        this.selectUserRole('ESS');
        this.enterEmployeeName(employeeFullName);
        this.selectStatus('Enabled');
        this.enterUsername(username);
        this.enterPassword(password);
        this.confirmPassword(password);
        this.save();
    }
}

export default new AddUserPage();
