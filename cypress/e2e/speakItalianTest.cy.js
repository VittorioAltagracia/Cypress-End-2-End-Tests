import { AccessAndTestStorage } from "../utils/helperfile";
import { baseUrl } from "../utils/baseUrl";

describe("e2e tests for Speak Italian in Austin website", () => {
  it("navigates to the website and asserts that language is changed when users click", () => {
    cy.visit(baseUrl);

    cy.get(".title")
      .should("be.visible")
      .should("have.text", "Speak Italian in Austin!");

    cy.get(".fa-language").should("have.text", " Languages").click();
    cy.get(".dropdown-menu").should("have.class", "show");
    cy.get("#englishLink").should("be.visible");
    cy.get("#italianLink").should("be.visible").click();
    cy.get(".dropdown-menu").should("have.not.class", "show");

    AccessAndTestStorage("it");
    cy.get(".fa-language").should("have.text", " Lingue").click();
    cy.get("#englishLink").should("be.visible").click();

    AccessAndTestStorage("en");
    cy.get(".fa-language").should("have.text", " Languages").click();
  });
  it("navigates to all pages and confirms that urls are updated correctly", () => {
    cy.visit(baseUrl);
    cy.get(".nav2").should("have.text", " What we do").click();
    cy.url().should("be.equal", baseUrl + `/photos.html`);
    cy.get(".nav3").should("have.text", " Look at us").click();
    cy.url().should("be.equal", baseUrl + `/do.html`);
    cy.get(".nav1").should("have.text", " Who are we").click();
    cy.url().should("be.equal", baseUrl + `/index.html`);
  });
});
