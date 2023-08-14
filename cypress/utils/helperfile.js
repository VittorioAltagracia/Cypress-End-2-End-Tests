export function AccessAndTestStorage(lang) {
  cy.getAllLocalStorage().then((data) => {
    expect(data).to.deep.equal({
      "http://localhost:3000": {
        siteLang: lang,
      },
    });
  });
}
