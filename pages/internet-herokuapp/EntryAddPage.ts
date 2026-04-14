import {Locator, Page} from '@playwright/test';
import {BasePage} from '../BasePage';

export class EntryAddPage extends BasePage {
    readonly page: Page;

    readonly header: Locator;
    readonly entryTitle: Locator;
    readonly entryContentBody: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.getByRole('heading', { name: 'Entry Ad' });
        this.entryTitle = page.locator('.modal-title');
        this.entryContentBody = page.locator('.modal-body');
        this.closeButton = page.getByText('Close', { exact: true });
    }

    async getEntryTitle(): Promise<string> {
        return await this.entryTitle.innerText() ?? '';
    }

    async getEntryContent(): Promise<string> {
        return await this.entryContentBody.innerText() ?? '';
    }       

}