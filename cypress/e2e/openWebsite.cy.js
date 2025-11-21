/// <reference types="cypress" />

const UrlData = require("../fixtures/UrlData.json");

describe("Openning website spec", () => {
  it("should open website successfully", () => {
    cy.visit(UrlData.url);
    cy.contains("Login").should("be.visible");
    //wrong email and password
    cy.get("#user-name").should("be.visible").type("Hifsa");
    cy.get("#password").should("be.visible").type("Hifsa"); //.clear();
    cy.get("#login-button").should("exist").and("have.value", "Login").click();
    cy.get("[data-test='error']")
      .should("be.visible")
      .and(
        "have.text",
        "Epic sadface: Username and password do not match any user in this service"
      );
    cy.get(".error-button").should("be.visible").click();

    //correct email and password
    cy.get("#user-name").should("be.visible").clear().type("standard_user");
    cy.get("#password").should("be.visible").clear().type("secret_sauce");
    cy.get("#login-button").should("exist").and("have.value", "Login").click();

    //after login
    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("have.text", "Products");

    //find number of products
    cy.get(".inventory_item").should("have.length", 6);

    //each item has image, name, desc, price, add to cart button
    cy.get(".inventory_item").each(($el) => {
      cy.wrap($el).find(".inventory_item_img").should("be.visible");
      cy.wrap($el).find(".inventory_item_name").should("be.visible");
      cy.wrap($el).find(".inventory_item_desc").should("be.visible");
      cy.wrap($el).find(".inventory_item_price").should("be.visible");
      cy.wrap($el)
        .find("button")
        .should("be.visible")
        .and("have.text", "Add to cart")
        .click({ force: true });
      //remove button appears after adding to cart
      cy.wrap($el)
        .find("button")
        .should("be.visible")
        .and("have.text", "Remove");
    });
    //find cart icon with number of items added
    cy.get(".shopping_cart_badge").should("be.visible").and("have.text", "6");

    //side menu appears on clicking hamburger icon

    cy.get("#react-burger-menu-btn").should("be.visible").click();
    cy.get("#menu_button_container").should("be.visible");

    //finding length of menu items
    cy.get(".bm-item-list a").should("have.length", 4);

    //cross icon to close side menu
    cy.get("#react-burger-cross-btn").should("be.visible").click();

    //app logo
    cy.get(".app_logo").should("be.visible").and("have.text", "Swag Labs");

    ///testing filter functionality
    cy.get(".product_sort_container")
      .should("be.visible")
      .select("Price (low to high)");
    cy.get(".inventory_item_price").then(($prices) => {
      const priceTexts = $prices
        .map((index, html) => Cypress.$(html).text())
        .get();
      const prices = priceTexts.map((text) =>
        parseFloat(text.replace("$", ""))
      );
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });

    //high to low
    cy.get(".product_sort_container")
      .should("be.visible")
      .select("Price (high to low)");
    cy.get(".inventory_item_price").then(($prices) => {
      const priceTexts = $prices
        .map((index, html) => Cypress.$(html).text())
        .get();
      const prices = priceTexts.map((text) =>
        parseFloat(text.replace("$", ""))
      );
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices);
    });

    //add to cart and remove from cart functionality already tested above
    //cart page
    cy.get(".shopping_cart_link").should("be.visible").click();
    cy.url().should("include", "/cart.html");
    cy.get(".cart_item").should("have.length", 6);

    //cart badge should disappear after removing all items
    // removing all items from cart
    cy.get(".cart_item").each(($el) => {
      cy.wrap($el).find("button").click();
    });
    cy.get(".shopping_cart_badge").should("not.exist");

    //continue shopping from cart page

    cy.get("#continue-shopping").should("be.visible").click();
    cy.url().should("include", "/inventory.html");

    //logout from side menu
    // opening side menu
    cy.get("#react-burger-menu-btn").should("be.visible").click();
    cy.get("#menu_button_container").should("be.visible");
    cy.get(".bm-item-list a").contains("Logout").should("be.visible").click();
    cy.get("#login-button").should("be.visible");

    //logging in again to verify
    cy.get("#user-name").should("be.visible").type("standard_user");
    cy.get("#password").should("be.visible").type("secret_sauce");
    cy.get("#login-button").should("exist").and("have.value", "Login").click();
    cy.url().should("include", "/inventory.html");

    //adding one item to cart and verifying cart badge
    cy.get(".inventory_item")
      .first()
      .within(() => {
        cy.get("button")
          .should("be.visible")
          .and("have.text", "Add to cart")
          .click({ force: true });
      });

    //find cart icon with number of items added
    cy.get(".shopping_cart_badge").should("be.visible").and("have.text", "1");

    //checkout process
    cy.get(".shopping_cart_link").should("be.visible").click();
    cy.url().should("include", "/cart.html");
    cy.get("#checkout").should("be.visible").click();
    cy.url().should("include", "/checkout-step-one.html");

    //entering checkout info
    cy.get("#first-name").should("be.visible").type("Hifsa");
    cy.get("#last-name").should("be.visible").type("Ghazi");
    cy.get("#postal-code").should("be.visible").type("12345");
    cy.get("#continue").should("be.visible").click();
    cy.url().should("include", "/checkout-step-two.html");

    //items in checkout step two
    //asserting
    cy.get(".cart_item").should("have.length", 1);
    cy.get(".inventory_item_name").should("be.visible");
    cy.get(".inventory_item_price").should("be.visible");
    cy.get(".inventory_item_desc").should("be.visible");

    //payment and shipping info
    cy.get("[data-test=payment-info-label]").should("be.visible"); //payment info
    cy.get("[data-test=payment-info-value]")
      .should("be.visible")
      .and("have.text", "SauceCard #31337"); //payment info

    cy.get("[data-test=shipping-info-label]").should("be.visible");
    cy.get("[data-test=shipping-info-value]")
      .should("be.visible")
      .should("have.text", "Free Pony Express Delivery!"); //shipping info

    //product info on checkout step two page
    cy.get(".summary_subtotal_label").should("be.visible");
    cy.get(".summary_tax_label").should("be.visible");
    cy.get(".summary_total_label").should("be.visible");

    //asserting total amount
    cy.get(".summary_subtotal_label")
      .invoke("text")
      .then((subtotalText) => {
        const subtotal = parseFloat(subtotalText.replace("Item total: $", ""));
        cy.get(".summary_tax_label")
          .invoke("text")
          .then((taxText) => {
            const tax = parseFloat(taxText.replace("Tax: $", ""));
            const expectedTotal = subtotal + tax;
            cy.get(".summary_total_label")
              .invoke("text")
              .then((totalText) => {
                const total = parseFloat(totalText.replace("Total: $", ""));
                expect(total).to.equal(expectedTotal);
              });
          });
      });

    //cancel button
    cy.get("#cancel").should("be.visible");

    //finishing checkout
    cy.get("#finish").should("be.visible").click();
    cy.url().should("include", "/checkout-complete.html");
    cy.get(".complete-header")
      .should("be.visible")
      .and("have.text", "Thank you for your order!");

    //back to home
    cy.get("#back-to-products").should("be.visible").click();
    cy.url().should("include", "/inventory.html");
  });
});
