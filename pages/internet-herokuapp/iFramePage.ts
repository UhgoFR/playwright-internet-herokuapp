import {FrameLocator, Locator, Page} from '@playwright/test';
import {BasePage} from '../BasePage';
import { Frame } from 'playwright';

export class iFramePage extends BasePage {
    readonly page: Page;    
    readonly header: Locator;

    readonly alertBox: Locator;
    readonly closeAlertBoxButton: Locator;
    readonly iFrame: FrameLocator;
    readonly iFrameBody: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.getByRole('heading', { name: /iFrame/i });
        this.alertBox = page.getByRole('alert');
        this.closeAlertBoxButton = this.alertBox.getByRole('button', { name: 'Close' });
        this.iFrame = page.frameLocator('#mce_0_ifr');
        this.iFrameBody = this.iFrame.locator('#tinymce');
    }

    async closeAlertBoxifVisible(): Promise<void> {
        if (await this.alertBox.isVisible()) {
            await this.closeAlertBoxButton.click();
        }
    }

    async getIFrameContent(): Promise<string> {
        return await this.iFrameBody.innerText() ?? '';
    }
}