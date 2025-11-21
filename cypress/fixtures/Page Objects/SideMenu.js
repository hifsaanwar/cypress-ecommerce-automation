export class SideMenu {
  menuBtn() {
    return cy.get("#react-burger-menu-btn");
  }
  closeBtn() {
    return cy.get("#react-burger-cross-btn");
  }
  menuItems() {
    return cy.get(".bm-item-list a");
  }

  logout() {
    this.menuBtn().click();
    this.menuItems().contains("Logout").click();
  }
}
