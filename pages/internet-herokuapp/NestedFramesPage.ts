import {Locator, Page, FrameLocator} from '@playwright/test';
import {BasePage} from '../BasePage';

export class NestedFramesPage  extends BasePage {
    readonly page: Page;

    readonly topFrame: FrameLocator;
    readonly leftsFrameBody: Locator;
    readonly midleFrameBody: Locator;
    readonly rightsFrameBody: Locator;
    readonly bottomFrameBody: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.topFrame = page.frameLocator('frame[name="frame-top"]');
        this.leftsFrameBody = this.topFrame.frameLocator('frame[name="frame-left"]').locator('body');
        this.midleFrameBody = this.topFrame.frameLocator('frame[name="frame-middle"]').locator('body');
        this.rightsFrameBody = this.topFrame.frameLocator('frame[name="frame-right"]').locator('body');
        this.bottomFrameBody = page.frameLocator('frame[name="frame-bottom"]').locator('body');
    }

    async getLeftFrameText(): Promise<string> {
        return await this.leftsFrameBody.innerText() ?? '';
    }

    async getMiddleFrameText(): Promise<string> {
        return await this.midleFrameBody.innerText() ?? '';
    }

    async getRightFrameText(): Promise<string> {
        return await this.rightsFrameBody.innerText() ?? '';
    }

    async getBottomFrameText(): Promise<string> {
        return await this.bottomFrameBody.innerText() ?? '';
    }       
}