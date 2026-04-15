import {Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class MultipleWindowsPage extends BasePage {
    readonly page: Page;
    readonly clickHereLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        
        this.clickHereLink = page.locator('a', { hasText: 'Click Here' });
    }

    async clickOnClickHereLink() {
        await this.clickHereLink.click();
    }
}