import { LoginPage } from "../fixtures/Page Objects/HomePage";
import { InventoryPage } from "../fixtures/Page Objects/InventoryPage";
import { CartPage } from "../fixtures/Page Objects/CartPage";

describe("Cart Functionality", () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();
  const cart = new CartPage();

  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
    login.login("standard_user", "secret_sauce");
    inventory.addAllProductsToCart();
    inventory.cartIcon().click();
  });

  it("Remove all items", () => {
    cart.removeAllItems();
    cy.get(".shopping_cart_badge").should("not.exist");
  });

  it("Continue shopping", () => {
    cart.continueBtn().click();
    cy.url().should("include", "/inventory.html");
  });
});
