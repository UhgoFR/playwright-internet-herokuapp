import {Locator, Page} from "@playwright/test";
import {BasePage} from "../BasePage";

export class InputsPage extends BasePage {  
    readonly page:Page;
    readonly header:Locator;
    readonly inputField:Locator;

    constructor(page:Page) {
        super(page);
        this.page = page;
        this.header = page.getByRole('heading', {name:'Inputs'});
        this.inputField = page.getByRole('textbox');
    }
}