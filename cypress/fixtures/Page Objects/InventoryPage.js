export class InventoryPage {
  title() {
    return cy.get(".title");
  }
  products() {
    return cy.get(".inventory_item");
  }
  prices() {
    return cy.get(".inventory_item_price");
  }
  productSort() {
    return cy.get(".product_sort_container");
  }
  cartBadge() {
    return cy.get(".shopping_cart_badge");
  }
  cartIcon() {
    return cy.get(".shopping_cart_link");
  }
  addToCartButtons() {
    return cy.get("button").contains("Add to cart");
  }

  addAllProductsToCart() {
    cy.get(".inventory_item").each(($el) => {
      cy.wrap($el)
        .find("button")
        .contains("Add to cart")
        .click({ force: true });
    });
  }
}
