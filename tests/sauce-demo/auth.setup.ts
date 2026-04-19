import {test as setup, expect} from "@playwright/test";
import path from "path";

const authFile_standard = path.join(__dirname, '../../.auth/auth_standard.json');

setup('authenticate standard user', async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");

    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText("Products")).toBeVisible();

    // Save authentication state to a file
    await page.context().storageState({ path: authFile_standard });
});

const authFile_visual = path.join(__dirname, '../../.auth/auth_visual.json');
setup('authenticate visual user', async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");

    await page.getByPlaceholder("Username").fill("visual_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");   
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText("Products")).toBeVisible();

    // Save authentication state to a file
    await page.context().storageState({ path: authFile_visual });
});