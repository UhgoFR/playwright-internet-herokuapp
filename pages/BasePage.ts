import {Page} from '@playwright/test';

export class BasePage {
    readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

   /**
   * Waits for the page to finish loading (network idle state).
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  } 
}