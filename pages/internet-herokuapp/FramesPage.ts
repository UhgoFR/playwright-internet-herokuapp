import {Locator, Page} from '@playwright/test';
import {BasePage} from '../BasePage';

export class FramesPage extends BasePage {

    readonly page: Page;

    readonly header: Locator;
    readonly nestedFramesLink: Locator;
    readonly iFrameLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.getByRole('heading', { name: 'Frames' });
        this.nestedFramesLink = page.getByRole('link', { name: 'Nested Frames' });
        this.iFrameLink = page.getByRole('link', { name: 'iFrame' });

    }
}