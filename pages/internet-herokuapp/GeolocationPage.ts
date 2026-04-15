import {Locator, Page} from '@playwright/test';
import {BasePage} from '../BasePage';

export class GeolocationPage extends BasePage {
  readonly page: Page;
    readonly header: Locator;
    readonly whereAmIButton: Locator;
    readonly latResult: Locator;
    readonly longResult: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.header = page.getByRole('heading', { name: 'Geolocation' });
        this.whereAmIButton = page.getByRole('button', { name: 'Where am I?' });
        this.latResult = page.locator('#lat-value');
        this.longResult = page.locator('#long-value');
    }

    async getLocation(): Promise<{ latitude: string; longitude: string }> {
        await this.whereAmIButton.click();
        const latitude = await this.latResult.innerText();
        const longitude = await this.longResult.innerText();
        return { latitude, longitude };
    }   
    
}