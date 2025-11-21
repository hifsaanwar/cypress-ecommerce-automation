import { LoginPage } from "../fixtures/Page Objects/HomePage";
import { InventoryPage } from "../fixtures/Page Objects/InventoryPage";
import { CartPage } from "../fixtures/Page Objects/CartPage";
import { CheckoutPage } from "../fixtures/Page Objects/CheckoutPage";

describe("Checkout Tests", () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();
  const cart = new CartPage();
  const checkout = new CheckoutPage();

  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
    login.login("standard_user", "secret_sauce");

    inventory.products().first().find("button").click();
    inventory.cartIcon().click();
    cart.checkoutBtn().click();
  });

  it("Checkout flow", () => {
    checkout.fillInformation("Hifsa", "Ghazi", "12345");
    checkout.finishBtn().click();
    checkout.completeHeader().should("have.text", "Thank you for your order!");
  });
});
