class DashboardPage {
    constructor() {
        this.topHeader = 'h6';                             // Dashboard header text
        this.menuItems = '.oxd-main-menu-item';            // Left menu items
    }

    verifyDashboardLoaded() {
        cy.contains(this.topHeader, 'Dashboard')
            .should('be.visible');
    }

    navigateToModule(moduleName) {
        cy.get(this.menuItems)
            .contains(moduleName)
            .click();
    }
}

module.exports = new DashboardPage();
