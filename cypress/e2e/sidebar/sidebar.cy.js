import SidebarPage from "../../pages/SidebarPage";
import LoginPage from "../../pages/LoginPage";

describe("Sidebar Navigation Test", () => {

    beforeEach(() => {
        LoginPage.login("Admin", "admin123");
        cy.url().should('include', '/dashboard'); // ensure logged in
    });

    it("Navigate through sidebar menu items (skip Maintenance)", () => {

        const pages = [
            { name: "Admin", url: "/admin/viewSystemUsers" },
            { name: "PIM", url: "/pim/viewEmployeeList" },
            { name: "Leave", url: "/leave/viewLeaveList" },
            { name: "Time", url: "/time/viewEmployeeTimesheet" },
            { name: "Recruitment", url: "/recruitment/viewCandidates" },
            { name: "My Info", url: "/pim/viewPersonalDetails" },
            { name: "Performance", url: "/performance/searchEvaluatePerformanceReview" },
            { name: "Dashboard", url: "/dashboard/index" },
            { name: "Directory", url: "/directory/viewDirectory" },

            // SKIP MAINTENANCE (modal pops up)
            // { name: "Maintenance", url: "/maintenance/purgeEmployee" },

            { name: "Claim", url: "/claim/viewAssignClaim" },
            { name: "Buzz", url: "/buzz/viewBuzz" }
        ];

        pages.forEach(page => {
            SidebarPage.clickMenu(page.name);
            cy.url().should("include", page.url);
            cy.wait(500); // let UI settle
        });

    });

});
