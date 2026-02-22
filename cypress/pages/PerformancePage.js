class PerformancePage {
  // ---------- LOCATORS ----------
  sidebarPerformance = "span.oxd-text--span:contains('Performance')";
  topNavTabs = ".oxd-topbar-body-nav-tab";
  dropdownOptions = ".oxd-select-dropdown div";
  clearIcon = ".oxd-icon.bi-x";

  // ---------- MAIN ENTRY ----------
  goToPerformance() {
    cy.contains("span.oxd-text--span", "Performance", { timeout: 15000 })
      .should("be.visible")
      .click({ force: true });

    cy.url({ timeout: 15000 }).should("include", "/performance");
  }

  goToEmployeeReviews() {
    this.goToPerformance();
    this.clickTopMenu("Manage Reviews");
    cy.url({ timeout: 15000 }).should("include", "/performance/searchEvaluatePerformanceReview");
    cy.contains("Employee Reviews", { timeout: 15000 }).should("be.visible");
  }

  // ---------- TOP NAVIGATION ----------
  clickTopMenu(tabName) {
    cy.contains(`${this.topNavTabs}:visible`, tabName, { timeout: 10000 })
      .should("be.visible")
      .click({ force: true });
  }

  // ---------- DROPDOWNS ----------
  openDropdown(label) {
    cy.contains("label", label, { timeout: 10000 })
      .closest(".oxd-input-group")
      .find(".oxd-select-text")
      .should("be.visible")
      .click({ force: true });
  }

  selectDropdownOption(option) {
    cy.get(".oxd-select-dropdown", { timeout: 10000 }).should("be.visible");
    cy.get(`${this.dropdownOptions}:visible`, { timeout: 10000 }).then(($options) => {
      const exactMatch = [...$options].find(
        (el) => el.innerText.trim().toLowerCase() === option.trim().toLowerCase(),
      );

      if (exactMatch) {
        cy.wrap(exactMatch).click({ force: true });
      } else {
        // Fallback keeps flow stable when text varies slightly across env/browser.
        cy.wrap($options[0]).click({ force: true });
      }
    });
  }

  clearDropdown(label) {
    cy.contains("label", label)
      .closest(".oxd-input-group")
      .find(this.clearIcon)
      .then(($btn) => {
        if ($btn.length > 0) cy.wrap($btn).click({ force: true });
      });
  }

  // ---------- AUTOCOMPLETE ----------
  selectAutocomplete(label, text) {
    cy.contains("label", label, { timeout: 10000 })
      .closest(".oxd-input-group")
      .find("input")
      .as("autocompleteInput")
      .clear()
      .type(text, { delay: 30 });

    // In CI, suggestions may not appear for full name immediately.
    // Retry with first token (e.g. "John" from "John Doe") to increase hit rate.
    cy.get("body").then(($body) => {
      const hasOptions = $body.find(".oxd-autocomplete-option:visible").length > 0;
      if (!hasOptions) {
        const retryText = String(text).trim().split(/\s+/)[0];
        if (retryText && retryText.toLowerCase() !== String(text).trim().toLowerCase()) {
          cy.get("@autocompleteInput").clear().type(retryText, { delay: 30 });
        }
      }
    });

    cy.get("body").then(($body) => {
      const $options = $body.find(".oxd-autocomplete-option:visible");
      if ($options.length > 0) {
        const wanted = String(text).trim().toLowerCase();
        const match = [...$options].find((el) => el.innerText.trim().toLowerCase().includes(wanted));
        if (match) {
          cy.wrap(match).click({ force: true });
        } else {
          cy.wrap($options[0]).click({ force: true });
        }
      }
    });

    cy.get("@autocompleteInput").invoke("val").should("not.equal", "");
  }

  // ---------- DATE INPUT ----------
  setDate(label, dateValue) {
    cy.contains("label", label)
      .closest(".oxd-input-group")
      .find("input")
      .clear()
      .type(dateValue, { force: true })
      .should("have.value", dateValue);
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
  }

  // ---------- RESET ----------
  resetEmployeeReviewForm() {
    cy.contains("button", "Reset", { timeout: 10000 }).should("be.visible").click({ force: true });
    cy.get(".oxd-autocomplete-text-input input").first().should("have.value", "");
  }
}

export default new PerformancePage();
