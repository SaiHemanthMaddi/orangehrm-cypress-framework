import LoginPage from "../../pages/LoginPage";
import AddEmployeePage from "../../pages/AddEmployeePage";

describe("PIM - Add Employee", () => {

    const ts = Date.now();
    const first = `Auto${ts}`;
    const last = "Tester";
    const empId = `${Math.floor(Math.random() * 9000) + 1000}`;
    const username = `emp_${ts}`;
    const password = "Password123!";

    before(() => {
        cy.visit("/");
        LoginPage.login("Admin", "admin123");   // your login POM
    });

    it("should create a new employee successfully", () => {

        // Click PIM using stable href
        cy.get('a[href="/web/index.php/pim/viewPimModule"]', { timeout: 10000 })
            .should("be.visible")
            .click();

        // Click Add Employee safely
        cy.contains("Add Employee", { timeout: 10000 })
            .should("be.visible")
            .click();

        // Fill form
        AddEmployeePage.addEmployee(
            first,
            "",
            last,
            empId,
            username,
            password
        );

        // Verify success
        cy.url({ timeout: 10000 }).should("include", "/pim/viewPersonalDetails");
    });
});
