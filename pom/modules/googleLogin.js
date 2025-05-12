export class GoogleAuthPage {
  constructor(popup) {
    this.popup = popup;
    this.emailInput = popup.locator("#identifierId");
    this.signInGmail = popup.locator('h1[id="headingText"]');
    this.nextButton = popup.locator("#identifierNext button");
    this.passwordInput = popup.locator("#password input");
    this.passwordNextButton = popup.locator("#passwordNext button");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.nextButton.click();
    await this.passwordInput.waitFor({ state: "visible" });
    await this.passwordInput.fill(password);
    await this.passwordNextButton.click();
    await this.popup.waitForEvent("close");
  }
}
