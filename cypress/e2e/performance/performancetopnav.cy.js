import LoginPage from "../../pages/LoginPage";
import PerformancePage from "../../pages/PerformancePage";

describe("Performance Module – Employee Reviews Dropdowns", () => {

    beforeEach(() => {
        LoginPage.login("Admin", "admin123");
    });

    it("Validate dropdowns inside Employee Reviews", () => {

        // Step 1 – Enter Performance Module
        PerformancePage.goToPerformance();
    });

});
