import AddEmployeePage from "../../pages/AddEmployeePage";
import AddUserPage from "../../pages/AddUserPage";
import AdminPage from "../../pages/AdminPage";
import LoginPage from "../../pages/LoginPage";

let createdSysUser = ""; // <-- file-scope variable so Phase 1 and Phase 2 share it

describe("Full Flow: Create Employee + Create System User", () => {

    it("should create employee then create user successfully", () => {

        const timestamp = Date.now();

        const empFirst = `Auto${timestamp}`;
        const empLast = "Tester";
        const empId = `${Math.floor(Math.random() * 9000) + 1000}`;
        const empLoginUsername = `emp_${timestamp}`;
        const empPassword = "Password123!";
        const sysUsername = `sys_${timestamp}`;

        const employeeFullName = `${empFirst} ${empLast}`;

        // LOGIN
        LoginPage.login("Admin", "admin123");

        // STEP 1 — Add Employee
        cy.contains("PIM").click();
        cy.contains("Add Employee").click();

        AddEmployeePage.addEmployee(
            empFirst, "", empLast,
            empId,
            empLoginUsername,
            empPassword
        );

        // STEP 2 — Add System User
        cy.contains("Admin").click();
        cy.contains("Add").click();

        AddUserPage.addNewUser(
            employeeFullName,
            sysUsername,
            empPassword
        );

        // Save the created username for later phases
        createdSysUser = sysUsername;

        // STEP 3 — Verification
        cy.url({ timeout: 20000 }).should("include", "/admin/viewSystemUsers");
        AdminPage.searchUser(sysUsername);
        AdminPage.verifyUserAdded(sysUsername);
    });
});

describe("PHASE 2 – User Management Workflows", () => {

    // Make sure every test starts from a logged-in state on the Users page
    beforeEach(() => {
        LoginPage.login("Admin", "admin123");
        cy.contains("Admin").click();
        cy.contains("User Management").click();
        cy.contains("Users").click();

        cy.url().should("include", "/admin/viewSystemUsers");
    });

    it("1️⃣ Search newly created user", () => {
        // Use the username created in Phase 1
        AdminPage.searchUser(createdSysUser);
        AdminPage.verifyUserAdded(createdSysUser);
    });

    it("2️⃣ Edit the user (Disable account)", () => {
        AdminPage.editUser(createdSysUser, "Disabled");
        AdminPage.searchUser(createdSysUser);
        AdminPage.verifyUserAdded(createdSysUser);
    });

    it("3️⃣ Delete the user", () => {
        AdminPage.deleteUser(createdSysUser);

        // Validate user DOES NOT EXIST anymore
        AdminPage.searchUser(createdSysUser);
        cy.contains("No Records Found").should("be.visible");
    });

});
