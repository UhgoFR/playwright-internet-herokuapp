import {Locator, Page} from "@playwright/test";
import {BasePage} from "../BasePage";

export class StatusCodesPage extends BasePage{

    readonly page: Page;

    readonly header: Locator;
    readonly statusCode200Link: Locator;
    readonly statusCode301Link: Locator;
    readonly statusCode404Link: Locator;
    readonly statusCode500Link: Locator;
    
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.header = page.getByRole('heading', {name:'Status Codes'});
        this.statusCode200Link = page.getByRole('link', { name: '200' });
        this.statusCode301Link = page.getByRole('link', { name: '301' });
        this.statusCode404Link = page.getByRole('link', { name: '404' });
        this.statusCode500Link = page.getByRole('link', { name: '500' });
    }
}