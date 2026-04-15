import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class BasicAuthPage extends BasePage {
  readonly page: Page;  
    readonly header: Locator;
    readonly subHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.header = page.getByRole('heading', { name: 'Basic Auth' });
        this.subHeader = page.getByText('Congratulations! You must have the proper credentials.');  
    }
}
