describe("e2e tests of Speak Italian in Austin website", () => {
  it("navigates to the website and asserts that language is changed when users click", () => {
    cy.visit("http://localhost:3000/");

    cy.get(".title")
      .should("be.visible")
      .should("have.text", "Speak Italian in Austin!");

    cy.get(".fa-language").should("have.text", " Languages").click();
    cy.get(".dropdown-menu").should("have.class", "show");
    cy.get("#englishLink").should("be.visible");
    cy.get("#italianLink").should("be.visible").click();
    cy.get(".dropdown-menu").should("have.not.class", "show");

    cy.getAllLocalStorage().then((data) => {
      console.log(data);
      expect(data).to.deep.equal({
        "http://localhost:3000": {
          siteLang: "it",
        },
      });
    });
    cy.get(".fa-language").should("have.text", " Lingue");
  });
});
