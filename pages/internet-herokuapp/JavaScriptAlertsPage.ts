import {Locator, Page} from "@playwright/test";
import {BasePage} from "../BasePage";

export class JavaScriptAlertsPage extends BasePage {
    readonly page: Page;
    readonly header: Locator;
    readonly jsAlertButton: Locator;
    readonly jsConfirmButton: Locator;
    readonly jsPromptButton: Locator;
    readonly resultText: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.getByRole('heading', { name: 'JavaScript Alerts' });
        this.jsAlertButton = page.getByRole('button', { name: 'Click for JS Alert' });
        this.jsConfirmButton = page.getByRole('button', { name: 'Click for JS Confirm' });
        this.jsPromptButton = page.getByRole('button', { name: 'Click for JS Prompt' });
        this.resultText = page.locator('#result');
    }

    getResultText(): Promise<string> {
        return this.resultText.innerText();
    }   

    async triggerAlert(alertType: 'alert' | 'confirm' | 'prompt', promptText?: string): Promise<void> {
        return new Promise((resolve) => {
            const handleDialog = async (dialog: any) => {
                try {
                    switch (alertType) {
                        case 'alert':
                        case 'confirm':
                            await dialog.accept();
                            break;
                        case 'prompt':
                            if (promptText) {
                                await dialog.accept(promptText);
                            } else {
                                await dialog.accept();
                            }
                            break;
                    }
                } finally {
                    resolve();
                }
            };

            this.page.once('dialog', handleDialog);

            // Trigger the dialog
            (async () => {
                try {
                    switch (alertType) {
                        case 'alert':
                            await this.jsAlertButton.click();
                            break;
                        case 'confirm':
                            await this.jsConfirmButton.click();
                            break;
                        case 'prompt':
                            await this.jsPromptButton.click();
                            break;
                    }
                } catch (e) {
                    resolve();
                }
            })();
        });
    }   
}