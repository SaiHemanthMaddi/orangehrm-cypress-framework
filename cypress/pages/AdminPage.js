class AdminPage {

    tableRows = ".oxd-table-card";
    usernameCell = ".oxd-table-cell:nth-child(2)";
    editButton = "button i.bi-pencil-fill";
    deleteButton = "button i.bi-trash";
    confirmDeleteBtn = "button.oxd-button--label-danger";

    verifyUserAdded(username) {

        // Wait for table to load
        cy.get('.oxd-table-card', { timeout: 10000 })
            .should('have.length.at.least', 1);

        // Now check for the unique username
        cy.contains('.oxd-table-card', username, { timeout: 10000 })
            .scrollIntoView()
            .should('be.visible');
    }

    // SEARCH USER
    searchUser(username) {

        // Make sure we really are on System Users page
        cy.url().should('include', '/admin/viewSystemUsers');

        // Now select the Username field
        cy.contains('label', 'Username')
            .closest('.oxd-input-group')
            .find('input')
            .clear()
            .type(username);

        cy.contains('button', 'Search').click();
    }

    // EDIT USER
    editUser(username, newStatus = "Disabled") {

        this.searchUser(username);

        cy.get(this.tableRows)
            .filter(`:contains("${username}")`)
            .first()
            .within(() => cy.get(this.editButton).click());

        // Open Status dropdown
        cy.contains('label', 'Status')
            .closest('.oxd-input-group')
            .find('.oxd-select-text')
            .click();

        // Select Disabled
        cy.contains('.oxd-select-dropdown div', 'Disabled').click();

        cy.contains('button', 'Save').click();
        cy.contains("Success").should("be.visible");
    }

    // DELETE USER
    deleteUser(username) {

        this.searchUser(username);

        cy.get(this.tableRows)
            .filter(`:contains("${username}")`)
            .first()
            .within(() => cy.get(this.deleteButton).click());

        cy.get(this.confirmDeleteBtn).click({ force: true });

        cy.contains("Success").should("be.visible");
    }

    clickTopMenu(name) {
        cy.contains('.oxd-topbar-body-nav-tab', name, { timeout: 6000 })
            .should('be.visible')
            .click({ force: true });
    }

    verifyDropdownItems() {
        cy.get('.oxd-dropdown-menu')
            .should('be.visible')
            .find('li')
            .its('length')
            .should('be.gt', 0);   // ensure dropdown has items
    }
}

export default new AdminPage();
