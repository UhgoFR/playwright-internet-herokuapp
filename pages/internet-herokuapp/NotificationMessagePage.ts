import {Locator, Page} from "@playwright/test";
import {BasePage} from "../BasePage";


export class NotificationMessagePage extends BasePage{

    readonly page: Page;

    readonly header: Locator;   
    readonly clickHereLink: Locator;
    readonly notificationMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.clickHereLink = page.locator('a', { hasText: 'Click Here' });
        this.notificationMessage = page.locator('#flash');
        this.header = page.getByRole('heading', {name:'Notification Message'});
    }

    async getNotificationMessageText(): Promise<string> {
        return await this.notificationMessage.innerText();
    }
    
}