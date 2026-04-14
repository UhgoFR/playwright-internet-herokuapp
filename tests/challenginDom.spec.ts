import { test,expect } from "playwright/test";
import { HomePage, ChallenginDomPage } from "../pages/internet-herokuapp";

test.describe('Challenging DOM Page Tests', () => {

    let homePage: HomePage;
    let challenginDomPage: ChallenginDomPage;

     test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        challenginDomPage = new ChallenginDomPage(page);
        await homePage.goto(process.env.BASE_URL ?? '');
        await homePage.waitForPageLoad();
     }
    );

    test('should navigate to Challenging DOM page and see all the elements', async () => {
        await homePage.challengingDomLink.click();
        await challenginDomPage.waitForPageLoad();
        await expect(challenginDomPage.header).toBeVisible();
        await expect(challenginDomPage.buttonOne).toBeVisible();
        await challenginDomPage.buttonOne.click();
        await expect(challenginDomPage.buttonTwo).toBeVisible();
        await challenginDomPage.buttonTwo.click();
        await expect(challenginDomPage.buttonThree).toBeVisible();
        await challenginDomPage.buttonThree.click();
        await expect(challenginDomPage.canvas).toBeVisible();
        await expect(challenginDomPage.table).toBeVisible();
        await expect(challenginDomPage.header).toHaveText('Challenging DOM');
    });

    test.afterEach(async({page}) => {
        await page.close();
    });
});