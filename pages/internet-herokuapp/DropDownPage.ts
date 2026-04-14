import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class DropDownPage extends BasePage{

    readonly page: Page;

    readonly header: Locator;
    readonly dropdown: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.getByRole('heading', { name: 'Dropdown List' });
        this.dropdown = page.locator('#dropdown');

    }

    async SelectOption(option: string) {
        await this.dropdown.selectOption(option);
    }
}