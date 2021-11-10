/// <reference types="cypress" />

describe("Apps", () => {
  it("should display the apps with deployment frequencies", () => {
    cy.visit("/");

    cy.get("body")
      .contains("App A")
      .should("exist")
      .siblings()
      .eq(0)
      .children()
      .eq(0)
      .contains("Deployment Frequency: ")
      .should("exist");

    cy.get("body")
      .contains("App A")
      .should("exist")
      .siblings()
      .eq(0)
      .children()
      .eq(1)
      .get("svg")
      .should("exist");
  });
});
