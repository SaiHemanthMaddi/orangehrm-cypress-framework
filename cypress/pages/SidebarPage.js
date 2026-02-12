class SidebarPage {

    searchInput = 'input[placeholder="Search"]';
    sidebarToggle = 'button.oxd-icon-button.oxd-main-menu-button';

    toggleSidebar() {
        cy.get(this.sidebarToggle).click({ force: true });
        cy.wait(300);
    }

    typeInSearch(text) {
        cy.get(this.searchInput).should('be.visible').type(text, { delay: 80 });
        cy.wait(300);
    }

    clearSearch() {
        cy.get(this.searchInput).clear();
        cy.wait(300);

        // Wait for sidebar to fully return
        cy.get('.oxd-main-menu').should('be.visible');
    }

    clickMenu(name) {
        cy.contains('span.oxd-text--span', name, { timeout: 6000 })
            .should('be.visible')
            .click({ force: true });

        cy.wait(300);
    }
}

export default new SidebarPage();
