describe("e2e test of Speak Italian in Austin website", () => {
  it("navigates to the website", () => {
    cy.visit("http://localhost:3000/");

    cy.get(".title")
      .should("be.visible")
      .should("have.text", "Speak Italian in Austin!");

    cy.get(".fa-language").should("have.text", " Languages").click();
    cy.get(".dropdown-menu").should("have.class", "show");
  });
});
