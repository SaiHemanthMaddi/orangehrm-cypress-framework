class PIMPage {
    constructor() {
        this.addEmployeeButton = 'button:contains("Add")';
        this.searchField = 'input[placeholder="Type for hints..."]';
        this.searchButton = 'button:contains("Search")';
    }

    clickAddEmployee() {
        cy.get(this.addEmployeeButton).click();
    }

    searchEmployee(name) {
        cy.get(this.searchField).first().type(name);
        cy.get(this.searchButton).click();
    }

    openEmployee(name) {
        cy.contains('.oxd-table-card', name).click();
    }
}

module.exports = new PIMPage();
