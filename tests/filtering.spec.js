import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/modules/login";
import { GoogleAuthPage } from "../pom/modules/googleLogin";
import { DashboardPage } from "../pom/modules/dashboardPage";
import { LOGIN_PAYLOAD } from "../fixtures/payloadData";

test.describe("Filtering Tests", () => {
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

  test("Should filter cars by price range", async ({ page }) => {
    await dashboardPage.carLink.click();
    await dashboardPage.priceDropdown.click();

    await dashboardPage.priceFrom.fill("5000");
    await dashboardPage.priceTo.fill("15000");
    await dashboardPage.applyFilter.click();
    await expect(dashboardPage.priceDropdown).toContainText("5.000 - 15.000");
  });

  test("Should sort items by price", async ({ page }) => {
    await dashboardPage.carLink.click();
    await dashboardPage.sortFilter.click();
    await page.getByText("Cena rastuće").click();
    await expect(dashboardPage.sortFilter).toContainText("Cena rastuće");
  });
});
