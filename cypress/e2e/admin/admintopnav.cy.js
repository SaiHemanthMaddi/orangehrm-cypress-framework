import LoginPage from "../../pages/LoginPage";
import AdminPage from "../../pages/AdminPage";

describe("Admin Top Navigation Dropdown Test", () => {

    beforeEach(() => {
        LoginPage.login("Admin", "admin123");

        // Ensure we are on the Admin page
        cy.contains("Admin").click();
        cy.url().should("include", "/admin/viewSystemUsers");
    });

    it("Validate all top navigation dropdowns under Admin", () => {

        const topMenus = [
            "User Management",
            "Job",
            "Organization",
            "Qualifications",
            "More"
        ];

        topMenus.forEach(menu => {
            AdminPage.clickTopMenu(menu);
            AdminPage.verifyDropdownItems();

            cy.wait(300); // for smooth UI settling
        });

    });

});
