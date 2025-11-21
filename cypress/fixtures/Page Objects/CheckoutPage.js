export class CheckoutPage {
  firstName() {
    return cy.get("#first-name");
  }
  lastName() {
    return cy.get("#last-name");
  }
  postalCode() {
    return cy.get("#postal-code");
  }
  continueBtn() {
    return cy.get("#continue");
  }
  finishBtn() {
    return cy.get("#finish");
  }
  completeHeader() {
    return cy.get(".complete-header");
  }

  fillInformation(first, last, postal) {
    this.firstName().type(first);
    this.lastName().type(last);
    this.postalCode().type(postal);
    this.continueBtn().click();
  }
}
