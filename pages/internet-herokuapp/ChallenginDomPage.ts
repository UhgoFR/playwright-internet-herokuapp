import { Locator, Page } from "playwright-core";
import { BasePage } from "../BasePage";

export class ChallenginDomPage extends BasePage {
    readonly page: Page;
    
    readonly header: Locator;
    readonly buttonOne: Locator;    
    readonly buttonTwo: Locator;
    readonly buttonThree: Locator;
    readonly canvas: Locator;
    readonly table: Locator;


    constructor(page:Page) {
        super(page);
        this.page = page;

        this.header = page.getByRole('heading', { name: 'Challenging DOM' });
        this.buttonOne = page.locator('[class="button"]');
        this.buttonTwo = page.locator('[class="button alert"]');
        this.buttonThree = page.locator('[class="button success"]');
        this.canvas = page.locator('#canvas');
        this.table = page.getByRole('table').filter({ hasText: 'Definiebas2' });
}
//await page.getByText('Lorem Ipsum Dolor Sit Amet Diceret Action Iuvaret0 Apeirian0 Adipisci0').click();
//await page.getByText('Lorem Ipsum Dolor Sit Amet Diceret Action Iuvaret0 Apeirian0 Adipisci0').click();
}