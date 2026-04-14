import { Locator, Page  } from  "@playwright/test";  
import { BasePage } from "../BasePage";

export class CheckBoxesPage extends BasePage {
    readonly page: Page;

    readonly header: Locator;
    readonly checkboxOne: Locator;
    readonly checkboxTwo: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.getByRole('heading', { name: 'Checkboxes' });    
        this.checkboxOne = page.getByRole('checkbox').first();
        this.checkboxTwo = page.getByRole('checkbox').nth(1);
    }

    async checkAllCheckboxes() {
        await this.checkboxOne.check();
        await this.checkboxTwo.check();
    }

    async uncheckAllCheckboxes() {
        await this.checkboxOne.uncheck();
        await this.checkboxTwo.uncheck();
    }   

    async toggleCheckboxOne() {
        await this.checkboxOne.click();
    }

    async toggleCheckboxTwo() {
        await this.checkboxTwo.click();
    }   
}   