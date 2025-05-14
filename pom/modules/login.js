export class LoginPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1");
    this.loginButton = page.getByRole("button", {
      name: "Ulogujte se",
      exact: true,
    });
    this.emailInput = page.locator('[id="identifierId"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.gmailLoginButton = page.locator(
      'button[aria-label="Ulogujte se preko Gmail-a"]'
    );
  }
}
