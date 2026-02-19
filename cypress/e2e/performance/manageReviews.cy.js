import PerformancePage from "../../pages/PerformancePage";
import LoginPage from "../../pages/LoginPage";

describe("Performance → Manage Reviews → Search Filter Reset Functionality", () => {

    beforeEach(() => {
        LoginPage.login("Admin", "admin123");
        PerformancePage.goToEmployeeReviews();
    });

    it("should fill form and reset successfully", () => {

        PerformancePage.fillEmployeeReviewForm({
            employeeName: "John Doe",
            fromDate: "2024-01-01",
            toDate: "2026-12-31",
            jobTitle: "Software Engineer",
            reviewStatus: "In Progress"
        });


        PerformancePage.resetEmployeeReviewForm();
    });
});
