import {Locator, Page} from '@playwright/test';
import {BasePage} from '../BasePage';

export class SlowResourcesPage extends BasePage {
  readonly page: Page;
    readonly header: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.header = page.getByRole('heading', { name: 'Slow Resources' });
    }
}