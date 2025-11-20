describe("Openning website spec", () => {
  it("should open website successfully", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.contains("Login").should("be.visible"); // or validate username field
  });
});
