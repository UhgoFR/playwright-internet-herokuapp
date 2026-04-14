import {Locator, Page} from '@playwright/test';
import {BasePage} from '../BasePage';

export class FloatingMenuPage extends BasePage {
    readonly page: Page;

    readonly header: Locator;
    readonly floatingMenu: Locator;
    readonly homeLink: Locator;
    readonly newsLink: Locator;
    readonly contactLink: Locator;
    readonly aboutLink: Locator;        

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.getByRole('heading', { name: 'Floating Menu' });
        this.floatingMenu = page.locator('#menu');
        this.homeLink = this.floatingMenu.getByRole('link', { name: 'Home' });
        this.newsLink = this.floatingMenu.getByRole('link', { name: 'News' });
        this.contactLink = this.floatingMenu.getByRole('link', { name: 'Contact' });
        this.aboutLink = this.floatingMenu.getByRole('link', { name: 'About' });        
    }

    async isFloatingMenuVisible(): Promise<boolean> {
        return await this.floatingMenu.isVisible();
    }
    
}   
