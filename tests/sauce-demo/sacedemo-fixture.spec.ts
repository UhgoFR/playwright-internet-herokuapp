import {test} from '../../fixtures/sauce-demo-fixtures';
import {expect} from "@playwright/test";

test.describe("SauceDemo with Fixtures", () => {
    test("Login using Fixture @sauce-demo", async ({ loginPageStandardUser }) => {
        await expect(loginPageStandardUser.page.getByText("Products")).toBeVisible();
    });

    test("Login with locked_out_user @sauce-demo", async ({ locked_out_user }) => {
        await expect(locked_out_user.page.getByText("Sorry, this user has been locked out.")).toBeVisible();
    });

    test("Login with problem_user @sauce-demo", async ({ problem_user }) => {
        await expect(problem_user.page.getByText("Products")).toBeVisible();
    });

    test("Login with performance_glitch_user @sauce-demo", async ({ performance_glitch_user }) => {
        await expect(performance_glitch_user.page.getByText("Products")).toBeVisible();
    }); 

    test.afterEach(async ({ page }) => {
            await page.close();
        });
});