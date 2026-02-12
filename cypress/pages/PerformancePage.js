class PerformancePage {

    // ---------- LOCATORS ----------
    sidebarPerformance = "span.oxd-text--span:contains('Performance')";
    topNavTabs = ".oxd-topbar-body-nav-tab";
    dropdownBox = ".oxd-select-text";
    dropdownOptions = ".oxd-select-dropdown div";
    clearIcon = ".oxd-icon.bi-x";


    // ---------- MAIN ENTRY ----------
    goToPerformance() {
        cy.contains("span.oxd-text--span", "Performance")
            .should("be.visible")
            .click({ force: true });

        cy.url().should("include", "/performance");
        cy.wait(500);
    }

    goToEmployeeReviews() {
        this.goToPerformance();
        this.clickTopMenu("Manage Reviews");
        cy.contains("Employee Reviews").should("exist");
        cy.wait(500);
    }


    // ---------- TOP NAVIGATION ----------
    clickTopMenu(tabName) {
        cy.get(this.topNavTabs)
            .filter(":visible")
            .contains(tabName)
            .should("be.visible")
            .click({ force: true });

        cy.wait(400);
    }


    // ---------- DROPDOWNS ----------
    openDropdown(label) {
        cy.contains("label", label)
            .closest(".oxd-input-group")
            .find(".oxd-select-text")
            .click({ force: true });
    }

    selectDropdownOption(option) {
        cy.contains(this.dropdownOptions, option)
            .scrollIntoView()
            .click({ force: true });
    }

    clearDropdown(label) {
        cy.contains("label", label)
            .closest(".oxd-input-group")
            .find(this.clearIcon)
            .then($btn => {
                if ($btn.length > 0) cy.wrap($btn).click({ force: true });
            });
    }

    // ---------- AUTOCOMPLETE ----------
    selectAutocomplete(label, text) {
        cy.contains("label", label)
            .closest(".oxd-input-group")
            .find("input")
            .clear()
            .type(text, { delay: 100 });

        cy.get(".oxd-autocomplete-dropdown", { timeout: 7000 }).should("be.visible");

        cy.contains(".oxd-autocomplete-dropdown span", text)
            .click({ force: true });

        cy.wait(300);
    }

    // ---------- DATE INPUT ----------
    setDate(label, dateValue) {
        cy.contains("label", label)
            .closest(".oxd-input-group")
            .find("input")
            .clear()
            .type(dateValue, { force: true });

        cy.wait(200);
    }


    // ---------- MASTER FILL FUNCTION ----------
    fillEmployeeReviewForm(data) {

        if (data.employeeName) {
            this.selectAutocomplete("Employee Name", data.employeeName);
        }

        if (data.jobTitle) {
            this.openDropdown("Job Title");
            this.selectDropdownOption(data.jobTitle);
        }

        if (data.subUnit) {
            this.openDropdown("Sub Unit");
            this.selectDropdownOption(data.subUnit);
        }

        if (data.reviewStatus) {
            this.openDropdown("Review Status");
            this.selectDropdownOption(data.reviewStatus);
        }

        if (data.include) {
            this.openDropdown("Include");
            this.selectDropdownOption(data.include);
        }

        if (data.fromDate) this.setDate("From Date", data.fromDate);
        if (data.toDate) this.setDate("To Date", data.toDate);

        cy.wait(500);
    }


    // ---------- RESET ----------
    resetEmployeeReviewForm() {
        cy.contains("button", "Reset")
            .should("be.visible")
            .click({ force: true });

        cy.wait(800);
    }
}

export default new PerformancePage();
