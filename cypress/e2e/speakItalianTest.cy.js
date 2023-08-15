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
  it("tests carousel component and controls for it", () => {
    cy.visit(baseUrl);
    cy.get(".nav2").should("have.text", " What we do").click();
    cy.get("#photosCarousel").within(() => {
      cy.get('[cy-data="3"]')
        .should("be.visible")
        .then(() => {
          cy.get(".carousel-control-next-icon").click();
          cy.get('[cy-data="3"]').should("not.be.visible");
          cy.get('[cy-data="1"]').should("be.visible");
          cy.get(".carousel-control-next-icon").click();
          cy.get('[cy-data="2"]').should("be.visible");
          cy.get(".carousel-control-prev-icon").click();
          cy.get('[cy-data="1"]').should("be.visible");

          // testing carousel indicators on the bottom of carousel
          cy.get('[data-slide-to="1"]').click();
          cy.get('[data-slide-to="1"]').should("have.class", "active");
          cy.get('[data-slide-to="0"]').click();
          cy.get('[data-slide-to="0"]').should("have.class", "active");
          cy.get('[data-slide-to="2"]').should("have.not.class", "active");
        });
    });
  });
});
