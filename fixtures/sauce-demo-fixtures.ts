import {test as base} from "@playwright/test";
import { LoginPage } from "../pages/sauce-demo/LoginPage";

type SauceDemoFixtures = {
    loginPageStandardUser: LoginPage;
    locked_out_user: LoginPage;
    problem_user: LoginPage;
    performance_glitch_user: LoginPage;

}

export const test = base.extend<SauceDemoFixtures>({
    loginPageStandardUser: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login("standard_user", "secret_sauce"); 
        await loginPage.waitForPageToLoad();
        await use(loginPage);
    },
    locked_out_user: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login("locked_out_user", "secret_sauce");
        await loginPage.waitForPageToLoad();
        await use(loginPage);
    },
    problem_user: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login("problem_user", "secret_sauce");
        await loginPage.waitForPageToLoad();
        await use(loginPage);
    },
    performance_glitch_user: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login("performance_glitch_user", "secret_sauce");
        await loginPage.waitForPageToLoad();
        await use(loginPage);
    }   
});  
