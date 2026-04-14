import {Locator, Page} from "playwright-core";
import {BasePage} from "../BasePage";

export class KeyPressesPage extends BasePage {
    readonly page: Page;

    readonly header: Locator;
    readonly inputField: Locator;
    readonly resultText: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.getByRole('heading', {name: 'Key Presses'});
        this.inputField = page.locator('#target');
        this.resultText = page.locator('#result');
    }

    async getResultText(): Promise<string> {
        return await this.resultText.innerText()??'';
    }

    async pressKey(key: string): Promise<void> {
        await this.inputField.clear();
        await this.inputField.press(key);
    }   

}