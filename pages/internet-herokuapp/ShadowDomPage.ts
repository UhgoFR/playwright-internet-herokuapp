import {Locator, Page} from '@playwright/test';
import {BasePage} from '../BasePage';

export class ShadowDomPage extends BasePage {
  readonly page: Page;
    readonly header: Locator;   
    readonly shadowElemetSpan: Locator;
    readonly shadowListItems: Locator;
    
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.header = page.getByRole('heading', { name: 'Simple template' });
        this.shadowElemetSpan = page.locator('my-paragraph span');
        this.shadowListItems = page.locator('my-paragraph li');
    }

    async getListItemText(index: number): Promise<string>  {
        return await this.shadowListItems.nth(index).innerText();
    }

    async getShadowElementText(): Promise<string> {
        return await this.shadowElemetSpan.innerText();
    }

}