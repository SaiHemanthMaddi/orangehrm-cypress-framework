class AddEmployeePage {

    // Elements
    firstName = 'input[name="firstName"]';
    middleName = 'input[name="middleName"]';
    lastName = 'input[name="lastName"]';

    employeeIdInput = '.oxd-input-group:has(label:contains("Employee Id")) input';
    createLoginToggle = 'input[type="checkbox"]';

    usernameInput = '.oxd-input-group:has(label:contains("Username")) input';
    passwordInput = '.oxd-input-group:has(label:contains("Password")) input[type="password"]';
    confirmPasswordInput = '.oxd-input-group:has(label:contains("Confirm Password")) input[type="password"]';
    saveButton = 'button[type="submit"]';

    addEmployee(first, middle, last, empId, username, pwd) {

        cy.get(this.firstName).clear().type(first);

        if (middle && middle.trim() !== "") {
            cy.get(this.middleName).type(middle);
        }

        cy.get(this.lastName).type(last);

        // Employee ID
        cy.get(this.employeeIdInput).clear().type(empId);

        // Enable Create Login Details
        cy.get('.oxd-switch-input').click();

        // Username
        cy.get(this.usernameInput).should('be.visible').type(username);

        // Password
        cy.get(this.passwordInput).first().type(pwd); // first because confirm password also matches

        // Confirm Password
        cy.get(this.confirmPasswordInput).first().type(pwd);

        cy.intercept("POST", "**/pim/employees").as("saveEmployee");
        cy.get(this.saveButton).click();
        cy.wait("@saveEmployee");
    }
}

export default new AddEmployeePage();
