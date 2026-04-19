import { test } from '@playwright/test';
import { expect } from '@playwright/test';

// usar cuando el storage state se inyecta desde el archivo de configuración, en este caso el storage state del standard user
test.describe("SauceDemo with Storage State @sauce-demo", () => {
    test("Login using storage State @sauce-demo", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/inventory.html");
        await expect(page.getByText("Products")).toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});