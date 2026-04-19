import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { HomePage, ChallenginDomPage } from '../../pages/internet-herokuapp';

let baseURL: string;
baseURL = process.env.BASE_URL || 'https://the-internet.herokuapp.com';
let homePage: HomePage;
let challengingDomPage: ChallenginDomPage;

test.describe('Accessibility tests for Herokuapp', () => {

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        challengingDomPage = new ChallenginDomPage(page);   
        await homePage.goto(baseURL);
        await homePage.waitForPageLoad();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
    
  test('should have no accessibility violations on the home page', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have no accessibility violations on the Challenging DOM page header', async ({ page }) => {
    await homePage.challengingDomLink.click();
    await challengingDomPage.waitForPageLoad();

    const accessibilityScanResults = await new AxeBuilder({ page })
    .include('#canvas')
    .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should not have any automatically detectable WCAG A or AA violations', async ({ page }) => {
    await homePage.challengingDomLink.click();
    await challengingDomPage.waitForPageLoad();

    const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
    });
});