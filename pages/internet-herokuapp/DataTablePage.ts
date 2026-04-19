import {Locator, Page} from "@playwright/test";
import {BasePage} from "../BasePage";

export class DataTablePage extends BasePage {
    readonly page: Page;

    readonly header: Locator;
    readonly table: Locator;    

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.header = page.getByRole('heading', { name: 'Data Table' });
        this.table = page.locator('#table1');
        
    }   
}