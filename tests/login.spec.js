import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/modules/login";
import { GoogleAuthPage } from "../pom/modules/googleLogin";
import { LOGIN_PAYLOAD } from "../fixtures/payloadData";
import { DashboardPage } from "../pom/modules/dashboardPage";

test.describe("Login Tests", () => {
  let loginPage;
  let googleAuthPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("https://www.kupujemprodajem.com/");
    await loginPage.loginButton.click();

    const [popup] = await Promise.all([
      page.context().waitForEvent("page"),
      loginPage.gmailLoginButton.click(),
    ]);
    googleAuthPage = new GoogleAuthPage(popup);
    await expect(googleAuthPage.signInGmail).toBeVisible();
    dashboardPage = new DashboardPage(page);
  });

  test("Successful login with valid credentials", async () => {
    await googleAuthPage.login(LOGIN_PAYLOAD.email, LOGIN_PAYLOAD.password);
    await expect(dashboardPage.addAdvertisementButton).toBeVisible({
      timeout: 10000,
    });
  });
});
