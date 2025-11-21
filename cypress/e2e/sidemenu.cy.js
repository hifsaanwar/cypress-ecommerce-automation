/// <reference types="cypress" />

import { LoginPage } from "../fixtures/Page Objects/HomePage";
import { SideMenu } from "../fixtures/Page Objects/SideMenu";

describe("Side Menu Tests", () => {
  const login = new LoginPage();
  const menu = new SideMenu();

  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
    login.login("standard_user", "secret_sauce");
  });

  it("Should open and close the side menu", () => {
    // open menu
    menu.menuBtn().click();
    menu.menuItems().should("be.visible");

    // close menu
    menu.closeBtn().click();
    cy.get("#menu_button_container").should("not.have.class", "bm-menu-wrap");
  });

  it("Should contain correct navigation links", () => {
    menu.menuBtn().click();

    menu.menuItems().should("have.length", 4);
    menu.menuItems().eq(0).should("contain", "All Items");
    menu.menuItems().eq(1).should("contain", "About");
    menu.menuItems().eq(2).should("contain", "Logout");
    menu.menuItems().eq(3).should("contain", "Reset App State");

    menu.closeBtn().click();
  });

  it("Should logout from the side menu", () => {
    menu.logout();
    cy.get("#login-button").should("be.visible");
  });
});
