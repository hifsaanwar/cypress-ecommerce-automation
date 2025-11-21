export class CartPage {
  cartItems() {
    return cy.get(".cart_item");
  }
  continueBtn() {
    return cy.get("#continue-shopping");
  }
  checkoutBtn() {
    return cy.get("#checkout");
  }

  removeAllItems() {
    this.cartItems().each(($el) => {
      cy.wrap($el).find("button").click();
    });
  }
}
