import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/modules/login";
import { GoogleAuthPage } from "../pom/modules/googleLogin";
import { DashboardPage } from "../pom/modules/dashboardPage";
import { LOGIN_PAYLOAD, ADVERTISEMENT_PAYLOAD } from "../fixtures/payloadData";

test.describe("Dashboard Tests", () => {
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
    await googleAuthPage.login(LOGIN_PAYLOAD.email, LOGIN_PAYLOAD.password);

    dashboardPage = new DashboardPage(page);
  });

  test("Should create new advertisement successfully", async () => {
    await expect(dashboardPage.addAdvertisementButton).toBeVisible();
    await dashboardPage.createAdvertisement(ADVERTISEMENT_PAYLOAD);
    await expect(
      page.locator('span:has-text("Uspešno ste postavili oglas")')
    ).toBeVisible();
  });
});
