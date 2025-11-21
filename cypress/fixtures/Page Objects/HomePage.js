export class LoginPage {
  username() {
    return cy.get("#user-name");
  }
  password() {
    return cy.get("#password");
  }
  loginBtn() {
    return cy.get("#login-button");
  }
  errorMsg() {
    return cy.get('[data-test="error"]');
  }

  login(username, password) {
    this.username().clear().type(username);
    this.password().clear().type(password);
    this.loginBtn().click();
  }
}
export class HomePage {
  title() {
    return cy.get(".title");
  }
}
