import { LoginPage } from "../fixtures/Page Objects/HomePage";
import { InventoryPage } from "../fixtures/Page Objects/InventoryPage";

describe("Inventory Page", () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();

  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
    login.login("standard_user", "secret_sauce");
  });

  it("Validate product list", () => {
    inventory.products().should("have.length", 6);
    inventory.addAllProductsToCart();
    inventory.cartBadge().should("have.text", "6");
  });

  it("Filter: Low to High", () => {
    inventory.productSort().select("Price (low to high)");

    inventory.prices().then(($p) => {
      const prices = [...$p].map((el) =>
        parseFloat(el.innerText.replace("$", ""))
      );
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });
});
