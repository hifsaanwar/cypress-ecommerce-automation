/// <reference types="cypress" />

import { LoginPage } from "../fixtures/Page Objects/HomePage";
import { InventoryPage } from "../fixtures/Page Objects/InventoryPage";
import { SideMenu } from "../fixtures/Page Objects/SideMenu";
// cy.fixture("Page Objects/InventoryPage.js");
// cy.fixture("Page Objects/SideMenu.js");
// cy.fixture("Page Objects/HomePage.js");
//const UrlData = require("../../fixtures/Saucedemo.json");

describe("Login Tests", () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();
  const menu = new SideMenu();

  beforeEach(() => {
    cy.fixture("UrlData.json").then((UrlData) => {
      cy.visit(UrlData.url);
    });
  });

  it("Invalid login", () => {
    login.login("Hira", "Hifi");
    login
      .errorMsg()
      .should(
        "have.text",
        "Epic sadface: Username and password do not match any user in this service"
      );
  });

  it("Valid login", () => {
    login.login("standard_user", "secret_sauce");
    inventory.title().should("contain", "Products");
  });

  it("Logout", () => {
    login.login("standard_user", "secret_sauce");
    menu.logout();
    login.loginBtn().should("be.visible");
  });
});
