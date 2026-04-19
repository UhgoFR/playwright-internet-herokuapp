import {test} from '@playwright/test';
import {expect} from '@playwright/test';

test.describe("SauceDemo with Storage State and Multiple Roles", () => {
    test("multiple roles together @sauce-demo", async ({browser}) => {
        // Standard User
        const contextStandard = await browser.newContext({ storageState: './.auth/auth_standard.json' });
        const pageStandard = await contextStandard.newPage();
        await pageStandard.goto("https://www.saucedemo.com/inventory.html");
        await expect(pageStandard.getByText("Products")).toBeVisible();

        // Visual User
        const contextVisual = await browser.newContext({ storageState: './.auth/auth_visual.json' });
        const pageVisual = await contextVisual.newPage();
        await pageVisual.goto("https://www.saucedemo.com/inventory.html");
        await expect(pageVisual.getByText("Products")).toBeVisible();

        // Close contexts
        await contextStandard.close();
        await contextVisual.close();
    });
});
