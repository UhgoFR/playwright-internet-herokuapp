import { test, expect } from "playwright/test";

test.describe("SauceDemo @sauce-demo", () => {
  test("Login @sauce-demo", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText("Products")).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
        await page.close();
    });
});