import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test.use({ storageState: './.auth/auth_standard.json' });

test('Login using storage state : Standard User @sauce-demo', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");
    await expect(page.getByText("Products")).toBeVisible();
});


test.describe("SauceDemo with Storage State: Visual User", () => {
    test.use({ storageState: './.auth/auth_visual.json' });

    test("Login using storage State : Visual User @sauce-demo   ", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/inventory.html");
        await expect(page.getByText("Products")).toBeVisible();
    });
});

test.afterEach(async ({ page }) => {
    await page.close();
});