import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class RedirectionPage extends BasePage {
  readonly page: Page;
  
  readonly header: Locator;
  readonly clickHereLink: Locator;
  
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.header = page.getByRole('heading', { name: 'Redirection' });
    this.clickHereLink = page.getByRole('link', { name: 'here' });
  }
}